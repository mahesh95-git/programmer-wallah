import { Webhook } from 'svix'
import { headers } from 'next/headers'
import dpConnect from '@/services/dpconnection'
import User from '@/models/user.model';
export async function POST(req) {
  try {
    await dpConnect();
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error: Missing Svix headers', {
        status: 400,
      })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt

    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      })
    } catch (err) {
      console.error('Error: Could not verify webhook:', err)
      return new Response('Error: Verification error', {
        status: 400,
      })
    }

    const { first_name, email_addresses, image_url, last_name, profile_image_url, gender ,id} = evt.data
    const eventType = evt.type

    if (eventType === 'user.created') {
      const user = await User.findOne({ email: evt.data.email })
      if (!user) {
        const newUser = new User({
          email: email_addresses[0]. email_address,
          firstName: first_name,
          lastName: last_name || '',
          profileImage: profile_image_url || image_url || '',
          gender: gender,
          userId:id,

        });
        await newUser.save();
      }
    } else if (eventType === 'user.updated') {
      const user = await User.findOne({ email: evt.data.email })
      if (user) {
        user.email = email_addresses[0].email_address,
          user.firstName = first_name,
          user.lastName = last_name || '',
          user.profileImage = profile_image_url || image_url || '',
          user.gender = gender,
          user.userId=id,
        await user.save();
        console.log('User updated:', user);
      }
    } else if (eventType === 'user.deleted') {
      const user = await User.findOne({ email: evt.data.email })
      if (user) {
        await user.deleteOne();
        console.log('User deleted:', user);
      }
    } else {
      console.log('Unknown event type:', evt.type);
    }

    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Error: Webhook error', { status: 500 })
  }
}