class Khoa {
    constructor(makhoa, tenkhoa) {
        this.makhoa = makhoa;
        this.tenkhoa = tenkhoa;
    }
}
class SinhVien {
    constructor(mssv, tensv, ngaysinh, gioitinh, makhoa) {
        this.mssv = mssv;
        this.tensv = tensv;
        this.ngaysinh = ngaysinh;
        this.gioitinh = gioitinh;
        this.makhoa = makhoa;
    }
}

function addStudent() {
    let masv = document.getElementById('masv').value;
    let tensv = document.getElementById('hoten').value;
    let ngaysinh = document.getElementById('ngaysinh').value;
    let gioitinh = '';
    if(document.getElementById('male').checked) {
        gioitinh = document.getElementById('male').value;
    } else if(document.getElementById('famale').checked){
        gioitinh = document.getElementById('famale').value;
    }
    // let khoa = document.getElementsByClassName('khoa')
    // let selectoption = khoa.selectoption;
    // for(let i =0; i>selectoption.length;i++){
    //     console.log(selectoption[i].value)
    // }
    console.log(masv, tensv, ngaysinh, gioitinh)
}
function deleteStudent() {
    alert('hahha');
}
function updateStudent() {

}