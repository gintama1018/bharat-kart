import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt, notes } = await request.json()

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Amount must be at least ₹1' },
        { status: 400 }
      )
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paisa
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    })
  } catch (error: any) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Order creation failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.fetch(orderId)

    return NextResponse.json({
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      attempts: order.attempts,
    })
  } catch (error: any) {
    console.error('Razorpay fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { paymentId, orderId, signature } = await request.json()

    // Verify payment signature
    const crypto = require('crypto')
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + '|' + paymentId)
      .digest('hex')

    if (generated_signature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Fetch payment details
    const payment = await razorpay.payments.fetch(paymentId)

    return NextResponse.json({
      verified: true,
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: Number(payment.amount) / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
    })
  } catch (error: any) {
    console.error('Razorpay verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}