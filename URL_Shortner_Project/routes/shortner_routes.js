import { Router } from "express";
import { pageURLshortner, getShortnerURL, redirectToOriginalURL } from "../controller/postURLshortner.js";


const router = Router();


router.get("/report", (req, res) => {

    const student = [
        {
            name: "Prashant More",
            roll_no: "48",
            branch: "Computer Science",
            year: "2025"
        }, {
            name: "Deepak Kumar",
            roll_no: "52",
            branch: "Mechanical Engineering",
            year: "2025"
        }, {
            name: "Anjali Singh",
            roll_no: "60",
            branch: "Electrical Engineering",
            year: "2025"
        }, {
            name: "Riya Patel",
            roll_no: "73",
            branch: "Civil Engineering",
            year: "2025"
        }, {
            name: "Amit Sharma",
            roll_no: "85",
            branch: "Chemical Engineering",
            year: "2025"
        }
    ];

    return res.render("report", { student });
});


router.get("/", getShortnerURL);


router.post("/", pageURLshortner);

router.get("/:shortCode", redirectToOriginalURL);


// default export

// export default router;

export const shortnerRoutes = router;
