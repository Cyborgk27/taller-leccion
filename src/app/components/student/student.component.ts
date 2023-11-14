import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../model/Student.models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  students: Student[] = [
    {
      cedula: '0956324958',
      apellido: 'Cepeda',
      nombre: 'Kevin',
      nota1: 10,
      nota2: 10,
      asistencia: 67,
      promedio: (10 + 10) / 2,
      estado: 'Aprobado',
    },
    {
      cedula: '060258600',
      apellido: 'Cepeda',
      nombre: 'Manuel',
      nota1: 10,
      nota2: 10,
      asistencia: 67,
      promedio: (10 + 10) / 2,
      estado: 'Aprobado',
    },
    {
      cedula: '0603083346',
      apellido: 'Yupanqui',
      nombre: 'Inés',
      nota1: 8,
      nota2: 7,
      asistencia: 67,
      promedio: (8 + 7) / 2,
      estado: 'Aprobado',
    },
  
  ];
  globalPromedio: number = 0;

  studentForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      cedula: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      nota1: [0, Validators.required],
      nota2: [0, Validators.required],
      asistencia: [0, Validators.required],
    });
  }
  onSubmit() {
    const newStudent: Student = this.studentForm.value;
    newStudent.promedio = (newStudent.nota1 + newStudent.nota2) / 2;

    if (newStudent.promedio >= 6 && newStudent.asistencia >= 75) {
      newStudent.estado = 'Aprobado';
    } else if (newStudent.promedio >= 6 && newStudent.asistencia < 75) {
      newStudent.estado = 'Reprobado por asistencia';
    } else {
      newStudent.estado = 'Reprobado';
    }

    this.students.push(newStudent);
    this.calculateGlobalPromedio();
    this.studentForm.reset();
  }

  calculateGlobalPromedio() {
    if (this.students.length === 0) {
      this.globalPromedio = 0;
      return;
    }
  
    const studentsWithPromedio = this.students.filter(student => student.promedio !== undefined && !isNaN(student.promedio));
  
    if (studentsWithPromedio.length === 0) {
      this.globalPromedio = 0;
      return;
    }
  
    const totalPromedio = studentsWithPromedio.reduce((acc, student) => acc + student.promedio, 0);
    this.globalPromedio = totalPromedio / studentsWithPromedio.length;
  }
  
}
