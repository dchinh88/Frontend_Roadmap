
<template>
  <div class="container">
    <div class="header">
      <h1>Student Management</h1>
      <div class="search">
        <label for class="searchlabel">Tìm kiếm</label>
        <input type="text" value class="txtsearch" />
        <button class="btnSearch">Search</button>
      </div>
    </div>
    <div class="formInput">
      <div class="idInput">
        <label for>Nhập mã sinh viên</label>
        <input
          class="txtId"
          :class="{errors: errors.status}"
          type="text"
          placeholder="Vui lòng nhập mã sinh viên"
          v-model="sub.id"
        />
        <p class="error-text">{{ errors.id }}</p>
      </div>
      <div class="nameInput">
        <label for>Nhập tên sinh viên</label>
        <input
          type="text"
          class="txtName"
          :class="{errors: errors.status}"
          id="txtName"
          placeholder="Vui lòng nhập tên sinh viên"
          v-model="sub.name"
        />
        <p class="error-text">{{ errors.name }}</p>
      </div>
      <div class="birthdayInput">
        <label for>Chọn ngày sinh</label>
        <input
          class="selectedDate"
          type="date"
          name
          id
          v-model="sub.birthday"
          :class="{errors: errors.status}"
        />
        <p class="error-text">{{ errors.birthday }}</p>
      </div>
      <div class="genderInput">
        <label for>Chọn giới tính</label>
        <div class="selectGender" v-for="gender in genders" :key="gender.id">
          <span>{{ gender.name }}</span>
          <input 
            type="radio" 
            :value="gender.name" 
            name="gender" 
            v-model="sub.selectedGender" 
          />
        </div>
        <p class="error-text">{{ errors.selectedGender }}</p>
      </div>
      <div class="specializeds">
        <label for>Chọn khoa</label>
        <select class="selectKhoa" name id v-model="sub.selectedSpecializeds">
          <option
            v-for="specialized in specializeds"
            :key="specialized.id"
            :value="specialized.name"
          >{{ specialized.name }}</option>
        </select>
        <p class="error-text">{{ errors.selectedSpecializeds }}</p>
      </div>
    </div>
    <div class="actionForm">
      <div class="addStudent">
        <button @click="addStudent">ADD</button>
      </div>
      <div class="updateStudent">
        <button @click="updateStudent">UPDATE</button>
      </div>
      <div class="deleteStudent">
        <button @click="deleteSelectedStudents">DELETE</button>
      </div>
    </div>
    <div class="list-students">
      <table class="list-student">
        <thead>
          <tr>
            <td>(*)</td>
            <td>Mã sinh viên</td>
            <td>Tên sinh viên</td>
            <td>Ngày sinh</td>
            <td>Giới tính</td>
            <td>Ngành học</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student) in students" :key="student.id">
            <td>
              <input type="checkbox" :value="student.id" v-model="checked" />
            </td>
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.birthday }}</td>
            <td>{{ student.selectedGender }}</td>
            <td>{{ student.selectedSpecializeds }}</td>
            <td>
              <button @click="editStudent(student.id)">EDIT</button>
              <button @click="deleteStudent(student.id)">DELETE</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sub: {
        id: "",
        name: "",
        birthday: "",
        selectedGender: [],
        selectedSpecializeds: []
      },
      errors: {
        id: "",
        name: "",
        birthday: "",
        selectedGender: "",
        selectedSpecializeds: "",
        status: false
      },
      checked: [],
      students: [],
      selectStudent: {},
      editingStudent: null,
      genders: [
        {
          id: 1,
          name: "Nam"
        },
        {
          id: 2,
          name: "Nữ"
        }
      ],
      specializeds: [
        {
          id: 1,
          name: "Công nghệ thông tin"
        },
        {
          id: 2,
          name: "Điều dưỡng"
        },
        {
          id: 3,
          name: "Quản trị kinh doanh"
        },
        {
          id: 4,
          name: "Du lịch"
        }
      ],
      error: {
        text: "",
        status: false
      }
    };
  },
  mounted() {
    // Kiểm tra xem dữ liệu đã tồn tại trong localStorage hay chưa
    const storedStudents = localStorage.getItem("myStudents");
    if (storedStudents) {
      // Nếu đã tồn tại, gán giá trị từ localStorage cho đối tượng editedItem
      this.students = storedStudents ? JSON.parse(storedStudents) : [];
    }
  },
  methods: {
    validateForm() {
      if (this.sub.id.length < 3 || this.sub.id.length > 10) {
        this.errors.id = "ID ngắn, nhập lại ID.";
        this.errors.status = true;
      } else {
        this.errors.id = "";
        this.errors.status = false;
      }

      if (this.sub.name.length < 8 || this.sub.name.length > 25) {
        this.errors.name = "Tên không hợp lệ! Nhập lại tên.";
        this.errors.status = true;
      } else {
        this.errors.name = "";
        this.errors.status = false;
      }

      if (this.sub.birthday == "") {
        this.errors.birthday = "Chọn ngày sinh!";
        this.errors.status = true;
      } else {
        this.errors.birthday = "";
        this.errors.status = false;
      }

      if (this.sub.selectedGender == "") {
        this.errors.selectedGender = "Chọn giới tính!";
        this.errors.status = true;
      } else {
        this.errors.selectedGender = "";
        this.errors.status = false;
      }

      if (this.sub.selectedSpecializeds == "") {
        this.errors.selectedSpecializeds = "Chọn khoa!";
        this.errors.status = true;
      } else {
        this.errors.selectedSpecializeds = "";
        this.errors.status = false;
      }
    },
    addStudent() {
      if (this.validateForm()) {
        // if (
        //   this.sub.id &&
        //   this.sub.name &&
        //   this.sub.birthday &&
        //   this.sub.selectedGender &&
        //   this.sub.selectedSpecializeds
        // ) {
        //   this.students.push(this.sub);
        //   this.resetForm();
        //   this.saveToLocalStorage();
        // }
      } else {
        if (
          this.sub.id &&
          this.sub.name &&
          this.sub.birthday &&
          this.sub.selectedGender &&
          this.sub.selectedSpecializeds
        ) {
          this.students.push(this.sub);
          this.resetForm();
          this.saveToLocalStorage();
        }
      }
    },
    editStudent(index) {
      if (this.students && this.students.length > 0) {
        const student = this.students.find(student => student.id === index);
        this.editingStudent = student;
        if (student) {
          this.sub = { ...student };
        }
      }
    },
    updateStudent() {
      this.editingStudent.id = this.sub.id;
      this.editingStudent.name = this.sub.name;
      this.editingStudent.birthday = this.sub.birthday;
      this.editingStudent.selectGender = this.sub.selectedGender;
      this.editingStudent.selectedSpecializeds = this.sub.selectedSpecializeds;
      this.resetForm();
      this.editingStudent = null;
      this.saveToLocalStorage();
    },
    deleteStudent(studentId) {
      const ID = this.students.findIndex(student => student.id === studentId);
      if (confirm("Bạn có chắc muốn xóa sinh viên này?")) {
        if (ID !== -1) {
          this.students.splice(ID, 1);
          this.saveToLocalStorage();
        }
      }
    },
    deleteSelectedStudents() {
      if (confirm("Bạn có chắc muốn xóa những sinh viên này?")) {
        this.checked.forEach(studentId => {
          localStorage.removeItem(studentId);
          this.students = this.students.filter(
            student => student.id !== studentId
          );
          this.saveToLocalStorage();
        });
        this.checked = [];
      }
    },
    resetForm() {
      this.sub = {};
    },
    saveToLocalStorage() {
      localStorage.setItem("myStudents", JSON.stringify(this.students));
    }
  }
};
</script>

<style scoped>
.header {
  padding: 20px;
  border: 1px solid red;
}
.searchlabel {
  margin-right: 20px;
}
.header h1 {
  text-align: center;
}
.txtsearch {
  width: 500px;
  margin-right: 20px;
}
.btnSearch {
  width: 100px;
}
.formInput {
  border: 1px solid red;
  padding: 20px;
}
.selectGender {
  display: inline;
}
.txtId,
.txtName,
.selectKhoa {
  width: 250px;
}
.txtId,
.txtName {
  margin-left: 80px;
}

.error-text {
  color: red;
  font-size: 10px;
  margin-top: 4px;
  margin-left: 212px;
}
.selectedDate {
  margin-left: 101px;
}
.selectGender {
  margin-left: 110px;
}
.selectKhoa {
  margin-left: 135px;
}
.idInput,
.nameInput,
.birthdayInput,
.genderInput,
.specializeds {
  margin-bottom: 15px;
}
.actionForm {
  border: 1px solid red;
  display: inline-flex;
  width: 758px;
  padding: 20px;
  justify-content: center;
}
.addStudent,
.updateStudent,
.deleteStudent {
  margin-right: 30px;
}
.list-students {
  border: 1px solid red;
  padding: 20px;
}
table {
  width: 760px;
}
table tr td {
  border: 1px solid red;
}
</style>