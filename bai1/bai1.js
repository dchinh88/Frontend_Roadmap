class Khoa {
    constructor(makhoa, tenkhoa) {
        this.makhoa = makhoa;
        this.tenkhoa = tenkhoa;
    }
}
class SinhVien {
    constructor(masv, tensv, ngaysinh, gioitinh, makhoa) {
        this.masv = masv;
        this.tensv = tensv;
        this.ngaysinh = ngaysinh;
        this.gioitinh = gioitinh;
        this.makhoa = makhoa;
    }
}

var students = [];

var myIndex;
function addStudent() {
    let masv = document.getElementById('student-id').value;
    let tensv = document.getElementById('student-name').value;
    let ngaysinh = document.getElementById('student-birthday').value;
    let gioitinh = '';
    if (document.getElementById('student-gender-male').checked) {
        gioitinh = document.getElementById('student-gender-male').value;
    } else if (document.getElementById('student-gender-famale').checked) {
        gioitinh = document.getElementById('student-gender-famale').value;
    }
    let makhoa = document.getElementById('student-major').value;
    ////////validate 
    if (masv == '') {
        document.getElementById('err-msv').innerHTML = 'Nhập mã sinh viên đê';
        document.getElementById('err-msv').style.color = 'red'
    }
    else {
        document.getElementById('err-msv').innerHTML = ''
    }
    if (tensv == '') {
        document.getElementById('err-tensv').innerHTML = 'Nhập tên sinh viên đê';
        document.getElementById('err-tensv').style.color = 'red'
    }
    else {
        document.getElementById('err-tensv').innerHTML = ''
    }
    if (ngaysinh == '') {
        document.getElementById('err-birthday').innerHTML = 'Chọn ngày sinh';
        document.getElementById('err-birthday').style.color = 'red'
    }
    else {
        document.getElementById('err-birthday').innerHTML = ''
    }
    if (gioitinh == '') {
        document.getElementById('err-gender').innerHTML = 'Chọn giới tính';
        document.getElementById('err-gender').style.color = 'red'
    }
    else {
        document.getElementById('err-gender').innerHTML = ''
    }


    if (masv && tensv && ngaysinh && gioitinh && makhoa) {
        var newStudent = {
            masv: masv,
            tensv: tensv,
            ngaysinh: ngaysinh,
            gioitinh: gioitinh,
            makhoa: makhoa
        };
        students.push(newStudent);
        displayStudents();
    }
}
function displayStudents() {
    var listStudent = document.getElementById('form-list-student-body');
    var htmls = students.map((student, index) => {
        return `
                <tr>
                    <td><input id="checkmulti" type="checkbox" onchange="handleCheckboxChange(event, ${index})" /></td>
                    <td style="display: none">${index}</td>
                    <td>${student.masv}</td>
                    <td>${student.tensv}</td>
                    <td>${student.ngaysinh}</td>
                    <td>${student.gioitinh}</td>
                    <td>${student.makhoa}</td>
                    <td>
                        <button onclick="editStudent(${student.masv})" style="margin-right: 10px;"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteStudent(${student.masv})"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
    })
    listStudent.innerHTML = htmls.join('');

    document.getElementById('student-id').value = '';
    document.getElementById('student-name').value = '';
    document.getElementById('student-birthday').value = '';
    if (document.getElementById('student-gender-male').checked) {
        gioitinh = document.getElementById('student-gender-male').checked = false;
    } else if (document.getElementById('student-gender-famale').checked) {
        gioitinh = document.getElementById('student-gender-famale').checked = false;
    }
}

function editStudent(id) {
    for (var i in students) {
        if (students[i].masv == id) {
            document.getElementById('student-id').value = students[i].masv;
            document.getElementById('student-id').readOnly = true;
            document.getElementById('student-name').value = students[i].tensv;
            document.getElementById('student-birthday').value = students[i].ngaysinh;
            if (students[i].gioitinh == 'Nam') {
                gioitinh = document.getElementById('student-gender-male').checked = true;
            } else if (students[i].gioitinh == 'Nữ') {
                gioitinh = document.getElementById('student-gender-famale').checked = true;
            }
            document.getElementById('student-major').value = students[i].makhoa
            myIndex = i
        }
    }

}
function updateStudent() {
    let masv = document.getElementById('student-id').value;
    let tensv = document.getElementById('student-name').value;
    let ngaysinh = document.getElementById('student-birthday').value;
    let gioitinh = '';
    if (document.getElementById('student-gender-male').checked) {
        gioitinh = document.getElementById('student-gender-male').value;
    } else if (document.getElementById('student-gender-famale').checked) {
        gioitinh = document.getElementById('student-gender-famale').value;
    }
    let makhoa = document.getElementById('student-major').value;

    var updatedStudent = {
        masv: masv,
        tensv: tensv,
        ngaysinh: ngaysinh,
        gioitinh: gioitinh,
        makhoa: makhoa
    }
    students[myIndex] = updatedStudent;
    document.getElementById('student-id').readOnly = false;
    displayStudents()
}
function deleteStudent(id) {
    if (confirm('Bạn có chắc muốn xóa sinh viên này ?')) {
        for (var i in students) {
            if (students[i].masv == id) {
                students.splice(i, 1);
            }
        }
        displayStudents()
    }

}

var selectedStudents = []

function handleCheckboxChange(event, index) {
    if (event.target.checked) {
        selectedStudents.push(students[index])
    } else {
        var index = selectedStudents.indexOf(students[index]);
        if (index > -1) {
            selectedStudents.splice(index, 1);
        }
    }
}

function deleteselectedStudents() {

    if (confirm('Bạn có chắc muốn xóa những sinh viên này ?')) {
        selectedStudents.forEach(function (object) {
            var index = students.indexOf(object);
            if (index > -1) {
                students.splice(index, 1);
            }
        });
        selectedStudents = [];
    }

    displayStudents()
}




