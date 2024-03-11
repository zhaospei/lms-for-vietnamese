import express from 'express'
import 'dotenv/config'
import MajorRouter from './routes/major.js'
import CommentRouter from './routes/comment.js'
import PageRouter from './routes/page.js'
import UserRouter from './routes/user.js'
import ScheduleRouter from './routes/schedule.js'
import EventRouter from './routes/event.js'
import SubjectRouter from './routes/subject.js'
import DocumentRouter from './routes/document.js'
import ScoreRouter from './routes/score.js';
import ReportRouter from './routes/report.js';
import StatisticRouter from './routes/statistic.js';
import AdminRouter from './routes/admin.js';
import NotificationRouter from './routes/notification.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express';
import pkg from '@adminjs/sequelize';
const { Database, Resource } = pkg;
import User from './models/user.js';
import Document from './models/document.js';
import sequelize from './database/db.js';
import path from 'path'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import { useTranslation } from 'adminjs'
//import { superAuth} from './middlewares/superauth.js'
const { useTranslation } = pkg;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());
const PORT = process.env.PORT;
//app.get('/', (req, res) => {
    // const ipAddress = req.connection.remoteAddress
    // const ipPort = req.connection.remotePort
    // console.log(ipAddress);
    // console.log(ipPort);
    // console.log(req.headers.host);
    //res.status(200).send('Hello World!')
//})
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/', express.static('./out'));
// app.get('/:suffix', (req, res) => {
//     let suffix = req.params.suffix;
//     res.sendFile(path.join(__dirname, 'out', `${suffix}.html`));
// });
app.get('/all-subjects', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'all-subjects.html'));
});
app.get('/comment', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'comment.html'));
});
app.get('/forgotpassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'forgotpassword.html'));
});
app.get('/links', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'links.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'profile.html'));
});
app.get('/resetpassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'resetpassword.html'));
});
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'signup.html'));
});
app.get('/credit', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'credit.html'));
});

app.get('/statistic/gpa', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'statistic', `gpa.html`));
});

app.get('/statistic/credit', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'statistic', `credit.html`));
});

app.get('/statistic/personal', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'statistic', `personal.html`));
});

app.get('/statistic/subject', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'statistic', `subject.html`));
});

// app.use('/statistic/gpa', express.static('./out'));
// app.use('/statistic/credit', express.static('./out'));
// app.use('/statistic/personal', express.static('./out'));
// app.use('/statistic/subject', express.static('./out'));
app.get('/signup/activate', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'signup', `activate.html`));
});
// app.use('/signup/activate', express.static('./out'));
app.get('/settings/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'settings', `profile.html`));
});
// app.use('/settings/profile', express.static('./out'));

app.get('/schedule/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'schedule', 'calendar.html'));
});

app.get('/schedule/exam', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'schedule', 'exam.html'));
});

app.get('/schedule/subject-class', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'schedule', 'subject-class.html'));
});
// app.use('/schedule/calendar', express.static('./out'));
// app.use('/schedule/exam', express.static('./out'));
// app.use('/schedule/subject-class', express.static('./out'));
app.get('/mysubjects/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'mysubjects', 'curriculum.html'));
});

app.get('/mysubjects/registered', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'mysubjects', 'registered.html'));
});

app.get('/mysubjects/semester', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'mysubjects', 'semester.html'));
});

// app.use('/mysubjects/curriculum', express.static('./out'));
// app.use('/mysubjects/registered', express.static('./out'));
// app.use('/mysubjects/semester', express.static('./out'));
app.get('/mysubjects/registered/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'mysubjects','registered', `details.html`));
});
// app.use('/mysubjects/registered/details', express.static('./out'));
app.get('/images', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'images'));
});
// app.use('/images', express.static('./out'));
app.get('/all-subjects/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'all-subjects', 'details.html'));
});
app.get('/all-subjects/documents', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'all-subjects', 'documents.html'));
});

// app.use('/all-subjects/details', express.static('./out'));
// app.use('/all-subjects/documents', express.static('./out'));
app.get('/all-subjects/documents/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'all-subjects','documents', `details.html`));
});
// app.use('/all-subjects/documents/details', express.static('./out'));
app.get('/_next/image', (req, res) => {
    let suffix = req.query.url;
    res.sendFile(path.join(__dirname, 'out', `${suffix}`));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'search.html'));
});

app.use('/', PageRouter);
app.use('/', MajorRouter);
app.use('/', CommentRouter);
app.use('/', UserRouter);
app.use('/', ScheduleRouter);
app.use('/', EventRouter);
app.use('/', SubjectRouter);
app.use('/', DocumentRouter);
app.use('/', ScoreRouter);
app.use('/', StatisticRouter);
app.use('/', ReportRouter);
app.use('/', AdminRouter);
app.use('/', NotificationRouter);

const DEFAULT_ADMIN = {
  studentid: '21020006',
  password: 'password',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

AdminJS.registerAdapter({ Database, Resource })

const usersNavigation = {
    name: 'Users',
    icon: 'User',
}

const adminOptions = {
    // databases: [sequelize],
    branding: {
        companyName: 'UETable', // title of page
        logo: false,    // don't use adminJS default logo
        softwareBrothers: false, // hide adminJS link
        // favicon: ""
    },
    resources: [
        {
            resource: User,
            options: {
                navigation: 
                {
                    'icon': 'User',
                },
                listProperties: ['Id', 'StudentId', 'Name', ],
                filterProperties: ['Id', 'StudentId', 'Name', ],
                editProperties: ['StudentId', 'Name', 'Bio', 'Avatar', 'Role'],
                showProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
            },
        },
        {
            resource: Document,
            options: {
                navigation: {
                    // 'name': 'Documents',
                    'icon': 'note',
                },
                listProperties: ['Id', 'Name', 'Category', 'Download'],
                // filterProperties: ['Id', 'StudentId', 'Name', ],
                // editProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
                // showProperties: ['Id', 'StudentId', 'Name', 'Bio', 'Avatar'],
            },
        },
        {
            resource: sequelize.models.Subject,
            options: {
                navigation: {}
            },
        },
        {
            resource: sequelize.models.Comment,
            options: {
                navigation: {}
            },
        }, 
        {
            resource: sequelize.models.Report,
            options: {
                navigation: {}
            },
        }
    ],
}
const adminJs = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, adminRouter)

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))



