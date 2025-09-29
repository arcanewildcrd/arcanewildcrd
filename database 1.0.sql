CREATE DATABASE BSIT;

USE BSIT;

CREATE TABLE Depaertment (
    DeptNo INT PRIMARY KEY,
    DName VARCHAR(100),
    Loc VARCHAR(100)
);

INSERT INTO Department (DeptNo, DName, Loc) VALUES
(10, 'SALES', 'KAMPALA'),
(40, 'MARKETING', 'ENTEBBE'),
(30, 'ACCOUNTING', 'MUKONO');

ALTER TABLE Depaertment RENAME to Department ;



CREATE TABLE Employee (
    EmpNo INT PRIMARY KEY,
    EName VARCHAR(100),
    Job VARCHAR(100),
    Salary VARCHAR(100),
    DeptNo INT
);

INSERT INTO Employee (EmpNo, EName, Job, Salary, DeptNo) VALUES
(001, NULL, 'Clerk', 40000, 30),
(002, 'Agaba', 'Manager', 16000, 30),
(003, 'Mary', 'SalesLady', 20000, 10),
(004, 'Timo', 'Clerk', 40000, 30),
(005, 'Simon', 'Manager', 60000, 40),
(006, 'Mark', 'Manager', 45000, 10),
(007, 'Solomon', 'Teacher', 30000, 30);


USE BSIT;


SELECT * FROM Department;

SELECT * FROM Employee;

SELECT EmpNo, EName, Job FROM Employee;


SELECT DeptNo, DName FROM Department;

SELECT * FROM Department WHERE Loc = 'Kampala';


SELECT * FROM Employee WHERE Job = 'Manager';


SELECT EmpNo, EName FROM Employee WHERE DeptNo = 30;

SELECT DName, Loc FROM Department WHERE DeptNo = 10;


SHOW DATABASES;


USE BSIT;
SHOW TABLES;


SELECT * FROM Employee WHERE Job = 'Manager';


SELECT EmpNo, EName FROM Employee LIMIT 2;


DESCRIBE Department;


SELECT * FROM Employee WHERE Job = 'Manager' AND DeptNo = 30;

INSERT INTO Department (DeptNo, DName, Loc) VALUES
(50, 'PRO', 'Rubaga');

SELECT * FROM Department;


INSERT INTO Employee (EmpNo, EName, Job, Salary, DeptNo) VALUES
(008, 'Raijin', 'Incendiary', 270000, 50);


SELECT * FROM Employee;


SELECT COUNT (*) FROM Employee;


SELECT DISTINCT Job FROM Employee;








