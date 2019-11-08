const express = require("express");
const controller = require("./controller");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/webex/room", controller.room_list);
router.post("/webex/room", controller.room_create);
router.delete("/webex/room", controller.room_delete);
router.post("/webex/membership", controller.mem_create);
router.delete("/webex/membership", controller.mem_delete);
router.post("/webex/message/text", controller.msg_text);
router.post("/webex/message/markdown", controller.msg_markD);

router.get("/intercorp/person", controller.person_list);
router.post("/intercorp/person", controller.person_create);
router.delete("/intercorp/person", controller.person_delete);
router.post("/intercorp/face", controller.face_create);
router.post("/intercorp/enroll", controller.face_enroll);
router.delete("/intercorp/erase", controller.face_erase);
router.post("/intercorp/compare", controller.face_compare);

router.post("/patient/get", controller.patient_get);
router.post("/patient/markdown", controller.patient_markdown);

router.get("/demo/patient", controller.demo_patient_get);
router.post("/demo/patient", controller.demo_patient_set);
router.post("/demo/step", controller.demo_step_set);
router.post("/demo/medicine", controller.demo_medicine_set);
router.post("/demo/status", controller.demo_status_set);
router.get("/demo/timing", controller.demo_timing_get);
router.post("/demo/message", controller.demo_message_set_and_get);
router.post("/demo/room/clear/all", controller.demo_room_clear_all);

module.exports = router;
