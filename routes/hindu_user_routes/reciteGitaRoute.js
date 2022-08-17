const express=require('express')
const { getRecitationStats, markChapterAsRead, checkChapterIsRead, updateLastReadChapter, getLastReadChapter, markSummaryAsRead, markSummaryAsUnRead, updateLastReadSummary, checkSummaryIsRead, getLastReadSummary } = require('../../controllers/hindu_user_controllers/reciteGitaController')
const recite_gita_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

recite_gita_route.post('/get-gita-recitation-stats',authMiddleWare,getRecitationStats)
recite_gita_route.patch('/mark-chapter-as-read',authMiddleWare,markChapterAsRead)
recite_gita_route.post('/check-chapter-is-read',authMiddleWare,checkChapterIsRead)
recite_gita_route.patch('/update-last-read-chapter',authMiddleWare,updateLastReadChapter)
recite_gita_route.post('/get-last-read-chapter',authMiddleWare,getLastReadChapter)
recite_gita_route.patch('/mark-chapter-as-unread',authMiddleWare,markChapterAsRead)


recite_gita_route.patch('/mark-summary-as-read',authMiddleWare,markSummaryAsRead)
recite_gita_route.patch('/mark-summary-as-unread',authMiddleWare,markSummaryAsUnRead)
recite_gita_route.patch('/update-last-read-summary',authMiddleWare,updateLastReadSummary)
recite_gita_route.post('/check-summary-is-read',authMiddleWare,checkSummaryIsRead)
recite_gita_route.post('/get-last-read-summary',authMiddleWare,getLastReadSummary)

module.exports=recite_gita_route