-- AMH Smart Patient Flow - Database Schema
-- Run in Laragon: HeidiSQL / phpMyAdmin / MySQL CLI

CREATE DATABASE IF NOT EXISTS amh_kalmunai
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE amh_kalmunai;

-- ─── Users (all roles) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  role          ENUM('patient', 'reception', 'doctor', 'admin') NOT NULL,
  phone         VARCHAR(20),
  status        ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role),
  INDEX idx_users_email (email)
) ENGINE=InnoDB;

-- ─── Departments ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  dept_code     VARCHAR(10) NOT NULL UNIQUE,
  name          VARCHAR(150) NOT NULL,
  head_name     VARCHAR(120),
  floor         VARCHAR(50),
  capacity      INT NOT NULL DEFAULT 0,
  active_queues INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─── Doctors ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS doctors (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL UNIQUE,
  department_id   INT NOT NULL,
  specialization  VARCHAR(120) NOT NULL,
  availability    ENUM('Available', 'Busy', 'Break', 'Leave') NOT NULL DEFAULT 'Available',
  experience      VARCHAR(50),
  patients_today  INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
  INDEX idx_doctors_department (department_id)
) ENGINE=InnoDB;

-- ─── Patients ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NULL UNIQUE,
  patient_code    VARCHAR(20) NOT NULL UNIQUE,
  name            VARCHAR(120) NOT NULL,
  nic             VARCHAR(20) NOT NULL UNIQUE,
  mobile          VARCHAR(20) NOT NULL,
  email           VARCHAR(150),
  age             INT,
  gender          ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Male',
  address         VARCHAR(255),
  blood_group     VARCHAR(5),
  registered_date DATE NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_patients_nic (nic),
  INDEX idx_patients_mobile (mobile)
) ENGINE=InnoDB;

-- ─── Clinic Schedules ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinic_schedules (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  clinic_name   VARCHAR(150) NOT NULL,
  doctor_id     INT NOT NULL,
  day_of_week   ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  start_time    TIME NOT NULL,
  end_time      TIME NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  INDEX idx_clinic_doctor (doctor_id)
) ENGINE=InnoDB;

-- ─── Appointments ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  appointment_number  VARCHAR(30) NOT NULL UNIQUE,
  patient_id          INT NOT NULL,
  department_id       INT NOT NULL,
  doctor_id           INT NOT NULL,
  appointment_date    DATE NOT NULL,
  appointment_time    TIME NOT NULL,
  status              ENUM('Pending','Approved','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  notes               TEXT,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE RESTRICT,
  INDEX idx_appointments_date (appointment_date),
  INDEX idx_appointments_status (status),
  INDEX idx_appointments_patient (patient_id)
) ENGINE=InnoDB;

-- ─── Queues (one active queue per department session) ────────────
CREATE TABLE IF NOT EXISTS queues (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  department_id       INT NOT NULL,
  doctor_id           INT NOT NULL,
  token_prefix        CHAR(1) NOT NULL DEFAULT 'A',
  current_token_num   INT NOT NULL DEFAULT 0,
  avg_wait_time       INT NOT NULL DEFAULT 30,
  status              ENUM('Active','Paused','Closed') NOT NULL DEFAULT 'Active',
  queue_date          DATE NOT NULL DEFAULT (CURRENT_DATE),
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE RESTRICT,
  INDEX idx_queues_department (department_id),
  INDEX idx_queues_date (queue_date)
) ENGINE=InnoDB;

-- ─── Queue Tokens ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS queue_tokens (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  queue_id        INT NOT NULL,
  patient_id      INT NOT NULL,
  token_number    INT NOT NULL,
  token_display   VARCHAR(10) NOT NULL,
  queue_position  INT NOT NULL,
  status          ENUM('Waiting','Called','In Consultation','Completed','Skipped','Recalled') NOT NULL DEFAULT 'Waiting',
  wait_time       INT NOT NULL DEFAULT 0,
  called_at       TIMESTAMP NULL,
  completed_at    TIMESTAMP NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (queue_id) REFERENCES queues(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  UNIQUE KEY uq_queue_token (queue_id, token_number),
  INDEX idx_tokens_patient (patient_id),
  INDEX idx_tokens_status (status)
) ENGINE=InnoDB;

-- ─── Notifications ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  title       VARCHAR(150) NOT NULL,
  message     TEXT NOT NULL,
  type        ENUM('success','warning','info','error') NOT NULL DEFAULT 'info',
  is_read     TINYINT(1) NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_notifications_user (user_id)
) ENGINE=InnoDB;

-- ─── Hospital Settings ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hospital_settings (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  setting_key  VARCHAR(80) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  category     ENUM('hospital','queue','sms','notification') NOT NULL DEFAULT 'hospital',
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
