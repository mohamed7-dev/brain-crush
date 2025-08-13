import { userOnly } from "@/features/me/lib/authorization";
import { EnrollUserSchema } from "../lib/schema";
import { db } from "@/server/db";
import { HttpException } from "@/lib/exceptions";
import { stripeCustomersTable } from "@/server/db/schema";
import Stripe from "stripe";
import { stripe } from "@/config/stripe.config";
import { routes } from "@/lib/routes";

export async function enrollUserService(input: EnrollUserSchema) {
  const { userId, user } = await userOnly();
  const { courseId } = input;
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq, and }) => and(eq(t.isPublished, true), eq(t.id, courseId)),
    with: {
      purchases: {
        where: (t, { and, eq }) =>
          and(eq(t.userId, userId), eq(t.courseId, courseId)),
      },
    },
  });

  if (!foundCourse) throw HttpException.NotFound("Course not found!");

  if (foundCourse.purchases.length > 0)
    throw HttpException.Conflict(
      "Conflict: You already have purchased this course."
    );
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: foundCourse.title,
          description: foundCourse.description!,
        },
        unit_amount: Math.round(foundCourse.price! * 100),
      },
    },
  ];

  let stripeCustomer = await db.query.stripeCustomersTable.findFirst({
    where: (t, { eq }) => eq(t.userId, userId),
    columns: {
      stripeCustomerId: true,
    },
  });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: user?.emailAddresses[0].emailAddress,
    });
    stripeCustomer = await db
      .insert(stripeCustomersTable)
      .values({
        userId,
        stripeCustomerId: customer.id,
      })
      .returning()
      .then((data) => data[0]);
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer?.stripeCustomerId,
    line_items,
    mode: "payment",
    success_url: routes.stripeSuccess(foundCourse.id),
    cancel_url: routes.stripeError(foundCourse.id),
    metadata: {
      courseId: foundCourse.id,
      userId,
    },
  });
  return { sessionUrl: session.url };
}
