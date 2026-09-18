/* =========================================================
   RESULT HUB — INTERACTIVE JAVASCRIPT
   ========================================================= */

function calculateResult() {

    const name = document.getElementById("studentName").value.trim();
    const registerNumber =
        document.getElementById("registerNumber").value.trim();

    const devops = Number(document.getElementById("devops").value);
    const cloud = Number(document.getElementById("cloud").value);
    const database = Number(document.getElementById("database").value);
    const networks = Number(document.getElementById("networks").value);

    const marks = [devops, cloud, database, networks];

    /* -------------------------------
       VALIDATION
    -------------------------------- */

    if (!name || !registerNumber) {
        alert("Please enter Student Name and Register Number.");
        return;
    }

    if (marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
        alert("Please enter valid marks between 0 and 100.");
        return;
    }

    /* -------------------------------
       CALCULATIONS
    -------------------------------- */

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = total / marks.length;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    const passed = marks.every(mark => mark >= 40);
    const status = passed ? "PASS" : "FAIL";

    /* -------------------------------
       STUDENT INFORMATION
    -------------------------------- */

    document.getElementById("resultName").textContent = name;

    document.getElementById("resultRegister").textContent =
        registerNumber;

    document.getElementById("avatar").textContent =
        name.charAt(0).toUpperCase();

    /* -------------------------------
       ANIMATE NUMBERS
    -------------------------------- */

    animateNumber(
        document.getElementById("total"),
        0,
        total,
        1000,
        value => `${Math.round(value)}/400`
    );

    animateNumber(
        document.getElementById("percentage"),
        0,
        percentage,
        1200,
        value => `${value.toFixed(2)}%`
    );

    /* -------------------------------
       GRADE
    -------------------------------- */

    const gradeElement = document.getElementById("grade");

    gradeElement.style.transform = "scale(0.5)";
    gradeElement.style.opacity = "0";

    setTimeout(() => {
        gradeElement.textContent = grade;
        gradeElement.style.transition = "all 0.5s ease";
        gradeElement.style.transform = "scale(1)";
        gradeElement.style.opacity = "1";
    }, 250);

    /* -------------------------------
       STATUS
    -------------------------------- */

    const statusElement = document.getElementById("status");

    statusElement.textContent = status;

    if (passed) {

        statusElement.style.color = "#25e58a";
        statusElement.style.borderColor =
            "rgba(37, 229, 138, 0.35)";
        statusElement.style.background =
            "rgba(37, 229, 138, 0.08)";

    } else {

        statusElement.style.color = "#ff5577";
        statusElement.style.borderColor =
            "rgba(255, 85, 119, 0.35)";
        statusElement.style.background =
            "rgba(255, 85, 119, 0.08)";
    }

    /* -------------------------------
       SUBJECT SCORES
    -------------------------------- */

    document.getElementById("devopsScore").textContent = devops;
    document.getElementById("cloudScore").textContent = cloud;
    document.getElementById("databaseScore").textContent = database;
    document.getElementById("networksScore").textContent = networks;

    /* -------------------------------
       PROGRESS BARS
    -------------------------------- */

    animateBar("devopsBar", devops);
    animateBar("cloudBar", cloud);
    animateBar("databaseBar", database);
    animateBar("networksBar", networks);

    /* -------------------------------
       MESSAGE
    -------------------------------- */

    const message = document.getElementById("message");

    if (passed) {

        message.textContent =
            "🎉 Congratulations! Student has passed all subjects.";

        message.style.color = "#25e58a";

    } else {

        message.textContent =
            "⚠️ Student has failed one or more subjects.";

        message.style.color = "#ff5577";
    }

    /* -------------------------------
       RESULT CARD ANIMATION
    -------------------------------- */

    const summaryCard =
        document.querySelector(".summary-card");

    summaryCard.animate(
        [
            {
                transform: "scale(0.98)",
                opacity: 0.7
            },
            {
                transform: "scale(1)",
                opacity: 1
            }
        ],
        {
            duration: 600,
            easing: "cubic-bezier(.22,1,.36,1)"
        }
    );
}


/* =========================================================
   NUMBER COUNTER
   ========================================================= */

function animateNumber(element, start, end, duration, formatter) {

    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        // Smooth ease-out
        const eased =
            1 - Math.pow(1 - progress, 4);

        const current =
            start + (end - start) * eased;

        element.textContent = formatter(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


/* =========================================================
   PROGRESS BAR ANIMATION
   ========================================================= */

function animateBar(id, percentage) {

    const bar = document.getElementById(id);

    bar.style.width = "0%";

    requestAnimationFrame(() => {

        setTimeout(() => {

            bar.style.width = `${percentage}%`;

        }, 100);

    });
}


/* =========================================================
   3D MOUSE TILT
   ========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".student-card, .subject-input, .performance-card"
    );

tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   INPUT 3D EFFECT
   ========================================================= */

const inputs =
    document.querySelectorAll("input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.style.transform =
            "translateY(-2px)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.transform =
            "";

    });

});


/* =========================================================
   PAGE LOAD ANIMATION
   ========================================================= */

window.addEventListener("load", () => {

    const elements =
        document.querySelectorAll(
            ".glass-card, .pipeline-panel"
        );

    elements.forEach((element, index) => {

        element.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(20px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 600,
                delay: index * 100,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "both"
            }
        );

    });

});
/* =========================================================
   LIVE CI/CD PIPELINE
   ========================================================= */

function runPipelineAnimation() {

    const steps =
        document.querySelectorAll(".pipeline-step");

    const lines =
        document.querySelectorAll(".pipeline-line");

    // Reset pipeline

    steps.forEach(step => {
        step.classList.remove(
            "pipeline-active",
            "pipeline-complete"
        );
    });

    lines.forEach(line => {
        line.classList.remove(
            "pipeline-complete"
        );
    });

    // Animate each stage

    steps.forEach((step, index) => {

        setTimeout(() => {

            step.classList.add(
                "pipeline-active"
            );

        }, index * 900);

        setTimeout(() => {

            step.classList.remove(
                "pipeline-active"
            );

            step.classList.add(
                "pipeline-complete"
            );

            if (lines[index]) {

                lines[index].classList.add(
                    "pipeline-complete"
                );

            }

        }, index * 900 + 650);

    });
}