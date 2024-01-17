let button = document.getElementById('btn');

button.addEventListener('click', () => {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const result = document.getElementById('output');
    let height_status = false, weight_status = false;

    if (height === '' || isNaN(height) || (height <= 0)) {
        document.getElementById('height_error').innerHTML = 'Please provide a valid height';
    }
    else {
        document.getElementById('height_error').innerHTML = '';
        height_status = true;
    }
    if (weight === '' || isNaN(weight) || (weight <= 0)) {
        document.getElementById('weight_error').innerHTML = 'Please provide a valid weight';
    }
    else {
        document.getElementById('weight_error').innerHTML = '';
        weight_status = true;
    }
    if (height_status && weight_status) {
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        if (bmi < 18.6) {
            result.innerHTML = 'Under weight: ' + bmi;
        }
        else if (bmi >= 18.6 && bmi < 24.9) {
            result.innerHTML = 'Normal : ' + bmi;
        }
        else {
            result.innerHTML = 'Overweight: ' + bmi;

        }
    }
    else {
        alert('The form has errors');
        result.innerHTML = '';
    }
});

// Protein counter - functionallity
let button2 = document.getElementById('btn-protein-calculate');

button2.addEventListener('click', () => {
    const weightProtein = parseInt(document.getElementById('weight-protein').value);
    const resultProtein = parseInt(document.getElementById('output-protein').value);
    let weightStatus = false;

    if (weightProtein === '' || isNaN(weightProtein) || (weightProtein <= 0)) {
        document.getElementById('weight-protein-error').innerHTML = 'Please provide valid weight';
    }
    else {
        document.getElementById('weight-protein-error').innerHTML = '';
        weightStatus = true;
    }
    if (weightStatus) {
        const requiredProtein = weightProtein * 0.8;
        resultProtein.innerHTML = 'Your recomended dose of protein is:' + requiredProtein;
    }
    else {
        alert('The form has errors');
        resultProtein.innerHTML = '';
    }
});