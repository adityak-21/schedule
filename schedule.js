class Course {
    constructor(name, minCredits, maxCredits, schedule)
    {
        this.name = name;
        this.minCredits = minCredits;
        this.maxCredits=maxCredits;
        this.schedule=schedule;
    }
}

class Student {
    constructor(name) {
        this.name = name;
        this.courses=[];
    }
}

class SelectCourse {
    constructor(student) {
        this.student = student;
    }
    select(course, credits) {
        const courseExists = this.student.courses.some(c => c.course.name === course.name);
        if (courseExists) {
            alert(`Course ${course.name} is already added.`);
            return;
        }
        if(course.minCredits<=credits && course.maxCredits>=credits)
        {
            this.student.courses.push({course, credits});
            alert (`Course added successfully`);
        }
        else alert(`Credits not in range`);
    }
}

class Timetable {
    constructor(courses) {
        this.courses = courses;
    }
    generate() {
        let timetable = {};
        this.courses.forEach(({ course }) => {
            course.schedule.forEach(day => {
                if (!timetable[day]) {
                    timetable[day] = [];
                }
                timetable[day].push(`${course.name}`);
            });
        });

        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let sortedTimetable = {};
        dayOrder.forEach(day => {
            if (timetable[day]) {
                sortedTimetable[day] = timetable[day];
            }
        });

        return sortedTimetable;
    }
}

const courses = {
    "ESO207": new Course("ESO207", 9, 12, ["Monday", "Wednesday"]),
    "EE798R": new Course("EE798R", 11, 12, ["Tuesday", "Thursday"]),
    "EE650": new Course("EE650", 7, 10, ["Wednesday", "Friday"]),
    "CS455": new Course("CS455", 8, 10, ["Tuesday", "Wednesday", "Thursday"]),
    "CS315": new Course("CS315", 9, 12, ["Monday", "Friday"]),
    "CS253": new Course("cs253", 9, 11, ["Monday", "Tuesday", "Wednesday"])
};

let student;
let selectCourse;

document.getElementById('addCourseBtn').addEventListener('click', () => {
    const studentName = document.getElementById('studentName').value;
    const courseName = document.getElementById('courseSelect').value;
    const credits = parseInt(document.getElementById('credits').value);

    if (!student) {
        student = new Student(studentName);
        document.getElementById('studentName').disabled = true;
        selectCourse = new SelectCourse(student);
    }

    const course = courses[courseName];
    selectCourse.select(course, credits);
})

document.getElementById('generateTimetableBtn').addEventListener('click', () => {
    if (!student) {
        alert("Please add at least one course.");
        return;
    }

    const timetable = new Timetable(student.courses).generate();
    const timetableDiv = document.getElementById('timetable');
    timetableDiv.innerHTML = "<h2>Timetable</h2>";

    for (const day in timetable) {
        const courses = timetable[day].join(", ");
        timetableDiv.innerHTML += `<p><strong>${day}:</strong> ${courses}</p>`;
    }
});