import express from "express"
import cors from "cors"
import { prisma } from "./prisma"
const app = express()
app.use(cors())
app.use(express.json())
import base from "base-64"
import mail from "./functions/mail"

const zoomAccountId = `${process.env.ZOOM_ACCOUNT_ID}`
const zoomClientId = `${process.env.ZOOM_CLIENT_ID}`
const zoomClientSecret = `${process.env.ZOOM_CLIENT_SECRET}`
type invitee = string
interface zoomResponse {
    uuid: string,
    host_email: string,
    topic: string,
    duration: number,
    start_url: string,
    join_url: string,
    password: string,
}
const getAuthHeaders = () => {
    return {
        Authorization: `Basic ${base.encode(
            `${zoomClientId}:${zoomClientSecret}`
        )}`,
        "Content-Type": "application/json",
    };
};
const generateZoomAccessToken = async () => {
    try {
        const response = await fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
            }
        );
        const jsonResponse = await response.json();
        return jsonResponse?.access_token;
    } catch (error) {
        console.log("generateZoomAccessToken Error --> ", error);
        throw error;
    }
};
const generateZoomMeeting = async (invitees: invitee[], email: string, name: string) => {
    let res;
    try {
        const zoomAccessToken = await generateZoomAccessToken();

        const response = await fetch(
            `https://api.zoom.us/v2/users/me/meetings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${zoomAccessToken}`,
                },
                body: JSON.stringify({
                    agenda: "Zoom Meeting for YT Demo",
                    default_password: false,
                    duration: 60,
                    password: "12345",

                    settings: {
                        allow_multiple_devices: true,

                        alternative_hosts_email_notification: true,
                        breakout_room: {
                            enable: true,
                            rooms: [
                                {
                                    name: "room1",
                                    participants: invitees.map(obj => {
                                        return obj
                                    })
                                },
                            ],
                        },
                        calendar_type: 1,
                        contact_email: email,
                        contact_name: name,
                        email_notification: true,
                        encryption_type: "enhanced_encryption",
                        focus_mode: true,
                        // global_dial_in_countries: ["US"],
                        host_video: true,
                        join_before_host: true,
                        meeting_authentication: true,
                        meeting_invitees: [
                            {
                                email: "garvitpriyansh@gmail.com",
                            },
                        ],
                        mute_upon_entry: true,
                        participant_video: true,
                        private_meeting: true,
                        waiting_room: false,
                        watermark: false,
                        continuous_meeting_chat: {
                            enable: true,
                        },
                    },
                    start_time: new Date().toLocaleDateString(),
                    timezone: "Asia/Kolkata",
                    topic: "Zoom Meeting for YT Demo",
                    type: 2, // 1 -> Instant Meeting, 2 -> Scheduled Meeting
                }),
            }
        );

        const jsonResponse = await response.json();


        console.log("generateZoomMeeting JsonResponse --> ", jsonResponse);
        res = jsonResponse
    } catch (error) {
        console.log("generateZoomMeeting Error --> ", error);
        throw error;
    }
    return res
};
app.get('/details', async (req: express.Request, res: express.Response) => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
        const data: any = await response.json();
        const countries = data.map((obj: any) => {
            return {
                flag: obj.flags.png,
                name: obj.name.official
            }
        })
        const slots = await prisma.slots.findMany({
            where: {
                booked: false
            }
        })

        res.status(200).json({
            slots,
            countries,
            valid: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.post('/form', async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, organisation, project_req, slot, date, mobile, country } = req.body;
        if (!name || !email || !organisation || !project_req || !slot || !date || !mobile || !country) {
            res.status(405).json({
                message: 'Incomplete details',
                valid: false
            })
            return
        }
        const booked_slot = await prisma.slots.findFirst({
            where: {
                date: date,
                slot: slot,
                booked: true
            }
        })
        if (booked_slot) {
            res.status(403).json({
                message: "Requested slot is booked, kindly select anoter slot",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    name: name,
                    email: email,
                    organization: organisation,
                    project_requirement: project_req,
                    mobile: mobile,
                    country: country
                }
            })

            const new_slot = await tx.slots.create({
                data: {
                    booked: true,
                    slot: slot,
                    date: date,
                    user_id: user.id
                }
            })
            return { user, new_slot }
        })
        if (!response.new_slot || !response.user) {
            res.status(403).json({
                message: "Unable to proceed with slot booking , try again",
                valid: true
            })
            return
        }
        const MAIL_BODY = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Received</title>
</head>
<body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 0;background:#f3f6fb;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" 
               style="background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.07);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0c67f5;padding:24px 30px;color:#ffffff;font-size:22px;font-weight:600;">
              Thank You for Booking With Us!
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 30px;color:#1f2937;font-size:16px;line-height:1.6;">
              <p style="margin:0 0 16px 0;">Hi ${name},</p>

              <p style="margin:0 0 16px 0;">
                We’ve received your booking request successfully. 🎉  
              </p>

              <p style="margin:0 0 16px 0;">
                Our team is reviewing your submitted details and will get back to you soon with confirmation.
              </p>

              <p style="margin:0;">We appreciate your interest and look forward to connecting with you!</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px;background:#f8fafc;color:#6b7280;font-size:14px;text-align:center;">
              For any queries, feel free to reach us at  
              <a href="mailto:1.edgeframesolutions.com" style="color:#0c67f5;text-decoration:none;">
                1.edgeframesolutions.com
              </a>
            </td>
          </tr>

        </table>
        <!-- END Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`
        const { info }: any = mail([email, "1.edgeframesolutions@gmail.com"], MAIL_BODY)

        res.status(200).json({
            message: "Slot booked , we will shortly mail you with the confirmed booking and meeting details",
            valid: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.post('/approve/:slotId/:userId', async (req: express.Request, res: express.Response) => {
    try {
        const slotId = req.params.slotId;
        const userId = req.params.userId;
        if (!slotId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        if (!userId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const user = await prisma.users.findFirst({
            where: {
                id: userId
            }
        })
        if (!user) {
            res.status(402).json({
                message: "User booking is invalid"
            })
            return
        }

        const slot = await prisma.slots.findFirst({
            where: {
                id: slotId
            }
        })
        if (!slot) {
            res.status(400).json({
                message: "No slot exists with id " + slotId
            })
            return
        }
        const code = req.headers.authorization;
        if (!code || code != "MaraMariEdgeFrameSolutions") {
            res.status(403).json({
                message: "Invalid code",
                valid: false
            })
            return
        }
        const meeting_response = await generateZoomMeeting([user.email, "1.edgeframesolutions@gmail.com"], user.email, `${user.name}`);
        if (!meeting_response) {
            res.status(400).json({
                message: "Unable to create meeting",
                valid: false
            })
        }
        const response = await prisma.$transaction(async (tx) => {
            const booking = await prisma.bookings.create({
                data: {
                    slot_id: slotId,
                    meeting_link: meeting_response.join_url,
                    user_id: userId,
                    meeting_password: meeting_response.password,
                    completed: false,
                }
            })
            return { booking }
        })
        if (!response.booking) {
            res.status(405).json({
                message: 'Unable to confirm booking',
                valid: false
            })
        }
        const MAIL_BODY = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Meeting Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 0;background:#eef2f7;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" 
               style="background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.07);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0c67f5;padding:24px 30px;color:#ffffff;font-size:22px;font-weight:600;">
              Your Meeting is Confirmed!
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 30px;color:#1f2937;font-size:16px;line-height:1.6;">
              <p style="margin:0 0 16px 0;">Hi ${user.name},</p>

              <p style="margin:0 0 16px 0;">
                Your meeting has been successfully confirmed. We're excited to connect with you!  
                Please find the meeting details below:
              </p>

              <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:18px 0;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;color:#374151;font-size:15px;width:160px;font-weight:600;">Date:</td>
                  <td style="padding:10px 0;color:#374151;font-size:15px;">${slot.date}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#374151;font-size:15px;font-weight:600;">Meeting ID:</td>
                  <td style="padding:10px 0;color:#374151;font-size:15px;">${response.booking.id}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#374151;font-size:15px;font-weight:600;">Password:</td>
                  <td style="padding:10px 0;color:#374151;font-size:15px;">${response.booking.meeting_password}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#374151;font-size:15px;font-weight:600;">Join URL:</td>
                  <td style="padding:10px 0;color:#0c67f5;font-size:15px;">
                    <a href="${response.booking.meeting_link}" style="color:#0c67f5;text-decoration:none;">Join Meeting</a>
                  </td>
                </tr>
              </table>

              <p style="margin:20px 0 0;">
                If you have any questions or need support, feel free to reach out.  
                We're here to help!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px;background:#f8fafc;color:#6b7280;font-size:14px;text-align:center;">
              For any queries, contact us at  
              <a href="mailto:1.edgeframesolutions.com" style="color:#0c67f5;text-decoration:none;">
                1.edgeframesolutions@gmail.com
              </a>
            </td>
          </tr>

        </table>
        <!-- END Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`

        const { info }: any = mail([user.email, "1.edgeframesolutions@gmail.com"], MAIL_BODY)
        if (!info) {
            res.status(403).json({
                message: "Unable to send mail , Booking confirmed",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Booking confirmed",
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            valid: true
        })
    }
})
app.get('/bookingRequests', async (req: express.Request, res: express.Response) => {
    try {
        const code = req.headers.authorization;
        if (!code || code != "MaraMariEdgeFrameSolutions") {
            res.status(403).json({
                message: "Invalid code",
                valid: false
            })
            return
        }



        const users = await prisma.users.findMany({})
        const slots_againts_users = await prisma.slots.findMany({
            where: {
                booked: true,
                user_id: {
                    in: users.map((obj) => { return obj.id })
                }
            },
        })
        const users_with_slots = users.forEach(user => {
            let temp = {};
            slots_againts_users.forEach((obj) => {

                if (obj.user_id == user.id) {
                    temp = {
                        users_id: user.id,
                        email: user.email,
                        slot: obj.slot,
                        mobile: user.mobile,
                        date: obj.date,
                        name: user.name
                    }
                }
            })
            return temp;
        })
        res.status(200).json({
            requests: users_with_slots
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.listen(3000, () => {
    console.log("App Started")
})