const express = require("express");

const ensureAuthentication = require("../middleware/Auth");

const {
    getMentors,
    sendMentorshipRequest,
    getMyRequests,
    getReceivedRequests,
    updateMentorshipRequest
} = require("../controllers/MentorshipController");

const router = express.Router();

router.get("/mentors", ensureAuthentication, getMentors);

router.post(
    "/request",
    ensureAuthentication,
    sendMentorshipRequest
);

router.get(
    "/my-requests",
    ensureAuthentication,
    getMyRequests
);

router.get(
    "/received-requests",
    ensureAuthentication,
    getReceivedRequests
);

router.patch(
    "/request/:id",
    ensureAuthentication,
    updateMentorshipRequest
);

module.exports = router;