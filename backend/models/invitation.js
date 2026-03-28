import mongoose from "mongoose"

const gallerySchema = new mongoose.Schema(
    {
        id:String,
        base64:String,
        caption:String
    }
)

const invitationSchema = new mongoose.Schema(
    {
        title:String,
        hostName:String,
        date:String,
        time:String,
        venue:String,
        description:String,
        template:String,
        slug:{
            type:String,
            unique:true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        bridePhoto:{
            type:String,
            default:null
        },
        groomPhoto:{
            type:String,
            default:null
        },
        gallery:[gallerySchema],
        selectedTemplate:{
            type:String,
            default:"south-indian-classic"
        }
    },
    {timestamps:true}
)

export default mongoose.model("Invitation", invitationSchema);