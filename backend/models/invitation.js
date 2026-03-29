import mongoose from "mongoose"

const gallerySchema = new mongoose.Schema({
    id: String,
    base64: String,
    caption: String,
})

const invitationSchema = new mongoose.Schema(
    {
        eventName:          String,
        brideName:          String,
        groomName:          String,
        brideParents:       String,
        groomParents:       String,
        weddingDate:        String,
        weddingTime:        String,
        muhurtamTime:       String,
        venue:              String,
        venueAddress:       String,
        receptionDate:      String,
        receptionTime:      String,
        receptionVenue:     String,
        receptionAddress:   String,
        mehendi:            Boolean,
        mehendiDate:        String,
        mehendiTime:        String,
        haldi:              Boolean,
        haldiDate:          String,
        haldiTime:          String,
        rsvpName:           String,
        rsvpPhone:          String,
        rsvpEmail:          String,
        dressCode:          String,
        personalNote:       String,
        brideBio:           String,
        groomBio:           String,
        venueMapUrl:        String,
        venueDirectionsUrl: String,
        slug: {
            type: String,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        selectedTemplate: {
            type: String,
            default: "south-indian-classic",
        },
        bridePhoto: {
            type: String,
            default: null,
        },
        groomPhoto: {
            type: String,
            default: null,
        },
        gallery: [gallerySchema],
    },
    { timestamps: true }
)

export default mongoose.model("Invitation", invitationSchema)
