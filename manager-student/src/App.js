import { useState } from 'react'

const genders = [
  {
    id: 1,
    name: 'Nam'
  },
  {
    id: 2,
    name: 'Nữ'
  }
]

// const listStudent = []
function App() {
  const [msv, setMsv] = useState('')
  const [tensv, setTensv] = useState('')
  const [ngaysinh, setNgaysinh] = useState('')
  const [gender, setGender] = useState()
  const [major, setMajor] = useState()
  const [students, setStudents] = useState(() => {
    const stogareStudents = JSON.parse(localStorage.getItem('students'))
    return stogareStudents ? stogareStudents : []
  })

  const [editingObject, setEditingObject] = useState(null) //Luu tru doi tuong chinh sua

  const handleAddStudent = () => {
    setStudents(prev => {
      const newStudent = [...prev, {
        msv,
        tensv,
        ngaysinh,
        gender,
        major
      }]
      const jsonStudents = JSON.stringify(newStudent)
      localStorage.setItem('students', jsonStudents)
      return newStudent
    })
    setMsv('')
    setTensv('')
    setNgaysinh('')
    setGender()
    setMajor()
    // console.log({ msv, tensv, ngaysinh, gender, major });
  }

  const handleChange = (e) => {
    const mj = e.target.value
    setMajor(mj)
  }

  //
  const handleEditStudent = (student) => {
    
    setEditingObject(student)
    setMsv(student.msv)
    setTensv(student.tensv)
    setNgaysinh(student.ngaysinh)
    setGender(student.gender)
    setMajor(student.major)
  }

  const handleUpdateStudent = () => {
    const updateStudents = students.map((student) => {
      if (student.msv === editingObject.msv) {
        return {
          ...student,
          msv: msv,
          tensv: tensv,
          ngaysinh: ngaysinh,
          gender: gender,
          major: major
        }
      }
      return student
    })
    setStudents(updateStudents)
    localStorage.setItem('students', JSON.stringify(updateStudents))
    setEditingObject(null)
    setMsv('')
    setTensv('')
    setNgaysinh('')
    setGender()
    setMajor()

  }


  const updateLocalStorage = (updateStudents) => {
    localStorage.setItem('students', JSON.stringify(updateStudents))
  }

  const handleDeleteStudent = (index) => {
    const result = window.confirm('Bạn có chắc muốn xóa những sinh viên này ?');
    if (result) {
      setStudents((prevStudents) => {
        const updateStudents = prevStudents.filter((_, i) => i !== index)
        updateLocalStorage(updateStudents)
        return updateStudents
      })
    }

  }


  //Xu ly checkbox được chọn hoặc bỏ chọn
  const handleCheckboxChange = (msv) => {
    const hanleCheck = students.map((student) => {
      if (student.msv === msv) {
        return {
          ...student,
          isChecked: !student.isChecked
        }
      }
      return student
    });
    setStudents(hanleCheck);
  };

  const handleDelete = () => {
    const result = window.confirm('Bạn có chắc muốn xóa những sinh viên này ?');
    if (result) {
      const filterStudents = students.filter((student) => !student.isChecked)
      setStudents(filterStudents);
      localStorage.setItem('students', JSON.stringify(filterStudents))
    }

  }

  return (

    <div className="App">
      <div className='row'>
        {/* SEARCH */}
        <div style={{ paddingRight: 20 }} className='search col-md-12'>
          <div className='area-search'></div>
          <label htmlFor='txtTukhoa'>Từ khóa: </label>
          <input
            type='text'
            name='txtTukhoa'
            id='txtTukhoa'
            placeholder='Từ khóa cần tìm' />
          <button>Tìm kiếm</button>
        </div>

        {/* FORM */}
        <div className='form-add col-md-12'>
          <form className='form-horizontal' id='form-edit-student'>
            <fieldset>
              {/* Form Name */}
              <legend>Student</legend>
              {/* Text input */}
              <div className='form-group'>
                <label
                  htmlFor='student-id'
                  className='col-md-2 control-label'
                >
                  Mã sinh viên
                  <span style={{ color: 'red', }}>(*)</span>
                </label>
                <div className='col-md-4'>
                  <input
                    value={msv}
                    onChange={e => setMsv(e.target.value)}
                    type='text'
                    id='student-id'
                    name='student-id'
                    placeholder='Nhập mã sinh viên'
                  />
                  <span id='err-msv'></span>
                </div>
              </div>
              {/* Text input */}
              <div className="form-group">
                <label
                  htmlFor="student-name"
                  className="col-md-2 control-label"
                >
                  Họ tên
                </label>
                <div className="col-md-4">
                  <input
                    value={tensv}
                    onChange={e => setTensv(e.target.value)}
                    type='text'
                    name='student-name'
                    id='student-name'
                    placeholder='Nhập họ tên'
                    className=''
                  />
                  <span id="err-tensv"></span>
                </div>
              </div>
              {/* Date input */}
              <div className="form-group">
                <label htmlFor="student-birthday" className="col-md-2 control-label">Ngày sinh</label>
                <div className="col-md-4">
                  <input
                    value={ngaysinh}
                    onChange={e => setNgaysinh(e.target.value)}
                    type="date"
                    name="student-birthday"
                    id="student-birthday"
                    className=""
                  />
                  <span id="err-birthday"></span>
                </div>
              </div>
              {/* Radio input */}
              <div className="form-group">
                <label htmlFor="student-gender" className="col-md-2 control-label">Giới tính</label>
                {genders.map(gender => (
                  <div key={gender.id} className='col-md-1'>
                    <input
                      type="radio"
                      id='student-gender'
                      name='student-gender'
                      checked={gender === gender.id}
                      onChange={() => setGender(gender.id)}
                    />
                    {gender.name}
                  </div>
                ))}
                <span id="err-gender"></span>
              </div>
              {/* Select */}
              <div className="form-group">
                <label
                  htmlFor="student-major"
                  className="col-md-2 control-label"
                >
                  Khoa
                </label>
                <select
                  name="student-major"
                  id="student-major"
                  onChange={handleChange}>
                  <option value="null">-- Select Major --</option>
                  <option value="CNTT">CNTT</option>
                  <option value="QTKD">QTKD</option>
                  <option value="NNVHTQ">NNVHTQ</option>
                  <option value="LTK">LTK</option>
                </select>
              </div>
            </fieldset>
          </form>
          <div className="form-group">
            <label htmlFor="btn-save" className="col-md-1 control-label"></label>
            <div className="col-md-1" id="saveupdate">
              <button
                onClick={handleAddStudent}
                id="btn-save"
                name="btn-save"
                className="btn btn-success"
              >Save</button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="btn-update" className="col-md-1 control-label"></label>
            <div className="col-md-1" id="update">
              <button
                id="btn-update"
                name="btn-update"
                className="btn btn-primary"
                onClick={handleUpdateStudent}

              >Update</button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="btn-delete" className="col-md-1 control-label"></label>
            <div className="col-md-1" id="delete">
              <button
                id="btn-delete"
                name="btn-delete"
                className="btn btn-danger"
                onClick={handleDelete}
              >Delete</button>
            </div>
          </div>
        </div>
        {/* LIST */}
        <div className="list-student">
          <legend>List of tudents</legend>
          <table className="table table-bordered table-condensed table-hover">
            <thead>
              <tr style={{ backgroundColor: 'red', color: 'white', }}>
                <td>(*)</td>
                <td>Mã sinh viên</td>
                <th>Tên sinh viên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Khoa</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="form-list-student-body">
              {/* <DisplayListStudent /> */}
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <input
                      id="checkmulti"
                      name="check"
                      type="checkbox"
                      checked={student.isChecked}
                      onChange={() => handleCheckboxChange(student.msv)}
                    />
                  </td>
                  <td>{student.msv}</td>
                  <td>{student.tensv}</td>
                  <td>{student.ngaysinh}</td>
                  <td>{student.gender === 1 ? 'Nam' : 'Nữ'}</td>
                  <td>{student.major}</td>
                  <td>
                    <button onClick={() => handleEditStudent(student)} ><i class="fas fa-edit"></i>Edit</button>
                    <button onClick={() => handleDeleteStudent(index)} ><i class="fas fa-trash-alt">Delete</i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
