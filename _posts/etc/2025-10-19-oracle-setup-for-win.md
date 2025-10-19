---
title: docker로 windows에 19c 설치
categories:
  - etc 
tags:
  - oracle
---
docker로 windows에 19c 설치하는 방법을 정리한 것입니다.  

## Install oracle19c using docker CLI
```bash
docker run -d --name oracle-19c -p 1521:1521 -e ORACLE_SID=ORCL -e ORACLE_PWD=oracle1234 -v C:\project\db\oradata:/opt/oracle/oradata doctorkirk/oracle-19c
```

## Install oralce19c using docker-compose 
```yaml
version: '3.8'
services:
  oracle-db:
    image: doctorkirk/oracle-19c
    container_name: oracle19c
    ports:
      - "1521:1521"
    environment:
      ORACLE_SID: ORCL
      ORACLE_PWD: oracle1234
      ORACLE_CHARACTERSET: AL32UTF8
    volumes:
      - ./oradata:/opt/oracle/oradata
```

```bash
docker-compose up -d
```

## Connect to Oracle and create scott user
```bash
docker exec -it oracle19c bash
sqlplus / as sysdba

alter session set "_ORACLE_SCRIPT"=TRUE

-- CREATE USER 
CREATE USER scott IDENTIFIED BY oracle1234
DEFAULT  TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;
-- GRANT CONNECT, RESOURCE, USER Tablespace
GRANT CONNECT, RESOURCE to scott;
ALTER USER scott QUOTA UNLIMITED ON USERS
```

## Create EMP table 
```SQL
CREATE TABLE EMP

       (EMPNO NUMBER(4) NOT NULL,
        ENAME VARCHAR2(10),
        JOB VARCHAR2(9),
        MGR NUMBER(4),
        HIREDATE DATE,
        SAL NUMBER(7, 2),
        COMM NUMBER(7, 2),
        DEPTNO NUMBER(2));



INSERT INTO EMP VALUES
        (7369, 'SMITH',  'CLERK',     7902,
        TO_DATE('17-12-1980', '%DD-%MM-%YYYY'),  800, NULL, 20);

INSERT INTO EMP VALUES
        (7499, 'ALLEN',  'SALESMAN',  7698,
        TO_DATE('20-02-1981', 'DD-MM-YYYY'), 1600,  300, 30);

INSERT INTO EMP VALUES
        (7521, 'WARD',   'SALESMAN',  7698,
        TO_DATE('22-02-1981', 'DD-MM-YYYY'), 1250,  500, 30);

INSERT INTO EMP VALUES
        (7566, 'JONES',  'MANAGER',   7839,
        TO_DATE('02-04-1981', 'DD-MM-YYYY'),  2975, NULL, 20);

INSERT INTO EMP VALUES
        (7654, 'MARTIN', 'SALESMAN',  7698,
        TO_DATE('28-09-1981', 'DD-MM-YYYY'), 1250, 1400, 30);

INSERT INTO EMP VALUES
        (7698, 'BLAKE',  'MANAGER',   7839,
        TO_DATE('01-05-1981', 'DD-MM-YYYY'),  2850, NULL, 30);

INSERT INTO EMP VALUES
        (7782, 'CLARK',  'MANAGER',   7839,
        TO_DATE('09-06-1981', 'DD-MM-YYYY'),  2450, NULL, 10);

INSERT INTO EMP VALUES
        (7788, 'SCOTT',  'ANALYST',   7566,
        TO_DATE('09-12-1982', 'DD-MM-YYYY'), 3000, NULL, 20);

INSERT INTO EMP VALUES
        (7839, 'KING',   'PRESIDENT', NULL,
        TO_DATE('17-11-1981', 'DD-MM-YYYY'), 5000, NULL, 10);

INSERT INTO EMP VALUES
        (7844, 'TURNER', 'SALESMAN',  7698,
        TO_DATE('08-09-1981', 'DD-MM-YYYY'),  1500, NULL, 30);

INSERT INTO EMP VALUES
        (7876, 'ADAMS',  'CLERK',     7788,
        TO_DATE('12-01-1983', 'DD-MM-YYYY'), 1100, NULL, 20);

INSERT INTO EMP VALUES
        (7900, 'JAMES',  'CLERK',     7698,
        TO_DATE('03-12-1981', 'DD-MM-YYYY'),   950, NULL, 30);

INSERT INTO EMP VALUES
        (7902, 'FORD',   'ANALYST',   7566,
        TO_DATE('03-12-1981', 'DD-MM-YYYY'),  3000, NULL, 20);

INSERT INTO EMP VALUES
        (7934, 'MILLER', 'CLERK',     7782,
        TO_DATE('23-01-1982', 'DD-MM-YYYY'), 1300, NULL, 10);

        

CREATE TABLE DEPT
       (DEPTNO NUMBER(2),
        DNAME VARCHAR2(14),
        LOC VARCHAR2(13) );



INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');

INSERT INTO DEPT VALUES (20, 'RESEARCH',   'DALLAS');

INSERT INTO DEPT VALUES (30, 'SALES',      'CHICAGO');

INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');


CREATE TABLE SALGRADE

        (GRADE NUMBER,

         LOSAL NUMBER,

         HISAL NUMBER);



INSERT INTO SALGRADE VALUES (1,  700, 1200);

INSERT INTO SALGRADE VALUES (2, 1201, 1400);

INSERT INTO SALGRADE VALUES (3, 1401, 2000);

INSERT INTO SALGRADE VALUES (4, 2001, 3000);

INSERT INTO SALGRADE VALUES (5, 3001, 9999);  
```