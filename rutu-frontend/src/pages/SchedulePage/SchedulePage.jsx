import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./SchedulePage.module.css";
import shape4 from "@assets/shape4.svg";
import shape9 from "@assets/shape9.svg";
import shape7 from "@assets/shape7.svg";

const DUMMY_MEETINGS = [
  { id: 1, date: 20, month: "March", year: 2026, time: "10:00 - 11:30", title: "Introduction to React", type: "Webinar", color: "#ffd54f" },
  { id: 2, date: 22, month: "March", year: 2026, time: "14:00 - 15:30", title: "UI Design Principles", type: "Workshop", color: "#60a5fa" },
  { id: 3, date: 25, month: "March", year: 2026, time: "19:00 - 20:30", title: "Backend Essentials", type: "Mentorship", color: "#fb7185" },
  { id: 4, date: 28, month: "March", year: 2026, time: "16:00 - 17:30", title: "Community Meetup", type: "Group Sync", color: "#4ade80" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState("March 2026");

  const getDayColor = (day) => {
    const meeting = DUMMY_MEETINGS.find((m) => m.date === day);
    return meeting ? meeting.color : "transparent";
  };

  return (
    <DashboardLayout title="Schedule Kelas">
      <div className={styles.scheduleContainer}>
        <img src={shape4} className={styles.decorShape1} alt="" />
        <img src={shape9} className={styles.decorShape2} alt="" />
        <img src={shape7} className={styles.decorShape3} alt="" />

        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.titleSection}
          >
            <h1 className={styles.mainTitle}>Next Meetings</h1>
            <p className={styles.subTitle}>Jangan lewatkan jadwal belajar seru kamu!</p>
          </motion.div>
        </div>

        <div className={styles.contentGrid}>
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            className={styles.calendarCard}
          >

            <div className={styles.calendarHeader}>
              <h3>{currentMonth}</h3>
              <div className={styles.calendarNav}>
                <button className={styles.navBtn}>{"<"}</button>
                <button className={styles.navBtn}>{">"}</button>
              </div>
            </div>

            <div className={styles.calendarGrid}>
              {DAYS.map((day) => (
                <div key={day} className={styles.dayLabel}>
                  {day}
                </div>
              ))}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const meetingColor = getDayColor(day);
                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.day} ${meetingColor !== "transparent" ? styles.hasMeeting : ""}`}
                    style={meetingColor !== "transparent" ? { borderColor: meetingColor } : {}}
                  >
                    {day}
                    {meetingColor !== "transparent" && (
                      <div
                        className={styles.eventDot}
                        style={{ backgroundColor: meetingColor }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: "#ffd54f" }} /> Webinar
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: "#60a5fa" }} /> Workshop
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: "#fb7185" }} /> Mentorship
              </div>
            </div>
          </motion.div>

          {/* Meeting List Section */}
          <div className={styles.meetingList}>
            {DUMMY_MEETINGS.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={styles.meetingItem}
                style={{ borderLeftColor: meeting.color }}
              >
                <div className={styles.meetingDate}>
                  <span className={styles.dateNum}>{meeting.date}</span>
                  <span className={styles.dateMonth}>{meeting.month}</span>
                </div>
                <div className={styles.meetingInfo}>
                  <h4 className={styles.meetingTitle}>{meeting.title}</h4>
                  <div className={styles.meetingMeta}>
                    <span className={styles.meetingTime}>🕒 {meeting.time}</span>
                    <span
                      className={styles.meetingType}
                      style={{ backgroundColor: meeting.color + "44", color: meeting.color }}
                    >
                      {meeting.type}
                    </span>
                  </div>
                </div>
                <button className={styles.joinBtn}>Join</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
