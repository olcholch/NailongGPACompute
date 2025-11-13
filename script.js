function getEquivalent(grade) {
    if (grade >= 98) return 4.00;
    if (grade >= 95) return 3.75;
    if (grade >= 92) return 3.50;
    if (grade >= 89) return 3.25;
    if (grade >= 86) return 3.00;
    if (grade >= 83) return 2.75;
    if (grade >= 80) return 2.50;
    if (grade >= 77) return 2.25;
    if (grade >= 74) return 2.00;
    if (grade >= 71) return 1.75;
    if (grade >= 68) return 1.50;
    if (grade >= 64) return 1.25;
    if (grade >= 60) return 1.00;
    return 0.00;
}

document.querySelector(".gpa-btn").addEventListener("click", function() {
    const midterms = document.querySelectorAll('input[name="midterm[]"]');
    const finals = document.querySelectorAll('input[name="final[]"]');
    const unitCells = document.querySelectorAll('table tr td:nth-child(3)');
    
    let useFinal = false;
    let allMidFilled = true;
    let allMidFinalFilled = true;

    for (let i = 0; i < midterms.length; i++) {
        if (midterms[i].value === "") allMidFilled = false;
        if (midterms[i].value === "" || finals[i].value === "") allMidFinalFilled = false;
        if (finals[i].value !== "") useFinal = true;
    }

    if (useFinal && !allMidFinalFilled) {
        alert("Please fill all midterm and final grades to compute GPA with final.");
        return;
    }

    if (!useFinal && !allMidFilled) {
        alert("Please fill all midterm grades to compute GPA.");
        return;
    }

    let totalPoints = 0;
    let totalUnits = 0;

    for (let i = 0; i < midterms.length; i++) {
        const mid = parseFloat(midterms[i].value);
        let finalGrade = mid;

        if (useFinal) finalGrade = (mid + parseFloat(finals[i].value)) / 2;

        const units = parseFloat(unitCells[i + 1].textContent); 
        const eq = getEquivalent(finalGrade);
        totalPoints += eq * units;
        totalUnits += units;
    }

    const gpa = totalPoints / totalUnits;
    document.getElementById("gpa-value").textContent = gpa.toFixed(2);
});


(() => {
    const btn = document.getElementById('semesterBtn');
    const menu = document.getElementById('semesterMenu');

    btn.addEventListener('click', e => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        menu.hidden = open;
    });

    menu.addEventListener('click', e => {
        const item = e.target.closest('[role="menuitem"]');
        if (!item) return;
        btn.textContent = item.textContent + ' ▾';
        btn.setAttribute('data-value', item.dataset.value);
        btn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
    });

    // allow keyboard selection (Enter / Space) on menu items
    menu.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            btn.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
            btn.focus();
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            const item = document.activeElement.closest('[role="menuitem"]');
            if (item) {
                btn.textContent = item.textContent + ' ▾';
                btn.setAttribute('data-value', item.dataset.value);
                btn.setAttribute('aria-expanded', 'false');
                menu.hidden = true;
                btn.focus();
            }
        }
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            btn.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
        }
    });
})();
        