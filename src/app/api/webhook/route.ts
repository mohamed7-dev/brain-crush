import Stripe from "stripe";
import { headers as getHeaders } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/config/stripe.config";
import { createPurchaseService } from "@/features/courses/services/create-purchase.service";

export async function POST(req: Request) {
  const body = await req.text();
  const headers = await getHeaders();
  const signature = headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return NextResponse.json(
        { message: `Webhook Error: Missing metadata` },
        {
          status: 400,
        }
      );
    }

    await createPurchaseService({
      courseId: courseId,
      userId: userId,
    });
  } else {
    return NextResponse.json(
      { message: `Webhook Error: Unhandled event type ${event.type}` },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json({ message: "Successful Payment" }, { status: 200 });
}
