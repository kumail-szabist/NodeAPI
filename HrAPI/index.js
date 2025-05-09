const express=require('express');
const cors=require('cors');
const pool=require('./db');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

// app.get('/', async(req,res))

const PORT= process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succesfully...${PORT}`);
});

app.get('/',async (req, res) => {
   try{
res.json('Welcome to HR API!')
   }catch(err){
    res.status(500).json({Error:err.message});
   }
  });

  app.get('/country',async (req, res) => {
    try{
const result=await pool.query('select * from countries');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


   app.get('/regions',async (req, res) => {
    try{
const result=await pool.query('select * from regions');
res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


   app.get('/employees',async (req, res) => {
    try{
        const result=await pool.query('select * from employees');
        res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


      app.get('/getCount/:table',async (req, res) => {
        const { table } = req.params;
    try{
        const result=await pool.query(`select count(*) from ${table}`);
        res.json(result.rows)
    }catch(err){
     res.status(500).json({Error:err.message});
    }
   });


app.get('/assignment/:number', async (req, res) => {
    const { number } = req.params;

    let query = '';
 
    switch (number) {
      case '40':
        query = `
          SELECT e.*, l.city, l.state_province, c.country_name
          FROM employees e
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
        `;
        break;
      case '41':
        query = `
          SELECT jh.*, e.first_name, e.last_name
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
        `;
        break;
      case '42':
        query = `
          SELECT e.*, jh.*
          FROM employees e
          LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
        `;
        break;
      case '43':
        query = `
          SELECT e.*, jh.*, d.department_name
          FROM employees e
          LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
          LEFT JOIN departments d ON jh.department_id = d.department_id
        `;
        break;
      case '44':
        query = `
          SELECT e.*, jh.*, d.department_name, l.city, l.state_province
          FROM employees e
          LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
          LEFT JOIN departments d ON jh.department_id = d.department_id
          LEFT JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '45':
        query = `
          SELECT e.*, jh.*, c.country_name
          FROM employees e
          LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
          LEFT JOIN departments d ON jh.department_id = d.department_id
          LEFT JOIN locations l ON d.location_id = l.location_id
          LEFT JOIN countries c ON l.country_id = c.country_id
        `;
        break;
      case '46':
        query = `
          SELECT jh.*, e.first_name, e.last_name, d.department_name
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
          JOIN departments d ON jh.department_id = d.department_id
        `;
        break;
      case '47':
        query = `
          SELECT jh.*, e.first_name, e.last_name, j.job_title
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
          JOIN jobs j ON jh.job_id = j.job_id
        `;
        break;
      case '48':
        query = `
          SELECT jh.*, e.first_name, e.last_name, j.job_title, d.department_name
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
          JOIN jobs j ON jh.job_id = j.job_id
          JOIN departments d ON jh.department_id = d.department_id
        `;
        break;
      case '49':
        query = `
          SELECT jh.*, e.first_name, e.last_name, j.job_title, l.city
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
          JOIN jobs j ON jh.job_id = j.job_id
          JOIN departments d ON jh.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '50':
        query = `
          SELECT jh.*, e.first_name, e.last_name, j.job_title, c.country_name
          FROM job_history jh
          JOIN employees e ON jh.employee_id = e.employee_id
          JOIN jobs j ON jh.job_id = j.job_id
          JOIN departments d ON jh.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
        `;
        break;
      case '51':
        query = `
          SELECT r.region_name, c.country_name, l.city
          FROM regions r
          JOIN countries c ON r.region_id = c.region_id
          JOIN locations l ON c.country_id = l.country_id
        `;
        break;
      case '52':
        query = `
          SELECT c.country_name, r.region_name, l.city
          FROM countries c
          JOIN regions r ON c.region_id = r.region_id
          JOIN locations l ON c.country_id = l.country_id
        `;
        break;
      case '53':
        query = `
          SELECT l.*, c.country_name, r.region_name
          FROM locations l
          JOIN countries c ON l.country_id = c.country_id
          JOIN regions r ON c.region_id = r.region_id
        `;
        break;
      case '54':
        query = `
          SELECT d.department_name, e.first_name, e.last_name, l.city
          FROM departments d
          JOIN employees e ON d.department_id = e.department_id
          JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '55':
        query = `
          SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name
          FROM employees e
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
        `;
        break;
      case '56':
        query = `
          SELECT e.first_name, e.last_name, m.first_name AS manager_first_name, d.department_name, l.city
          FROM employees e
          JOIN employees m ON e.manager_id = m.employee_id
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '57':
        query = `
          SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city
          FROM employees e
          JOIN jobs j ON e.job_id = j.job_id
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '58':
        query = `
          SELECT e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_name
          FROM employees e
          JOIN jobs j ON e.job_id = j.job_id
          JOIN departments d ON e.department_id = d.department_id
          JOIN employees m ON e.manager_id = m.employee_id
        `;
        break;
      case '59':
        query = `
          SELECT e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_name, l.city
          FROM employees e
          JOIN jobs j ON e.job_id = j.job_id
          JOIN departments d ON e.department_id = d.department_id
          JOIN employees m ON e.manager_id = m.employee_id
          JOIN locations l ON d.location_id = l.location_id
        `;
        break;
      case '60':
        query = `SELECT country_name FROM countries WHERE region_id = 1`;
        break;
      case '61':
        query = `
          SELECT d.department_name
          FROM departments d
          JOIN locations l ON d.location_id = l.location_id
          WHERE l.city LIKE 'N%'
        `;
        break;
      case '62':
        query = `
          SELECT e.*
          FROM employees e
          WHERE e.department_id IN (
            SELECT d.department_id
            FROM departments d
            JOIN employees m ON d.manager_id = m.employee_id
            WHERE m.commission_pct > 0.15
          )
        `;
        break;
      case '63':
        query = `
          SELECT DISTINCT j.job_title
          FROM employees e
          JOIN jobs j ON e.job_id = j.job_id
          WHERE e.employee_id IN (SELECT manager_id FROM employees WHERE manager_id IS NOT NULL)
        `;
        break;
      case '64':
        query = `
          SELECT l.postal_code
          FROM locations l
          JOIN countries c ON l.country_id = c.country_id
          JOIN regions r ON c.region_id = r.region_id
          WHERE r.region_name = 'Asia'
        `;
        break;
      case '65':
        query = `
          SELECT DISTINCT d.department_name
          FROM employees e
          JOIN departments d ON e.department_id = d.department_id
          WHERE e.commission_pct < (
            SELECT AVG(commission_pct)
            FROM employees
            WHERE commission_pct IS NOT NULL
          )
        `;
        break;
      case '66':
        query = `
          SELECT j.job_title
          FROM employees e1
          JOIN jobs j ON e1.job_id = j.job_id
          WHERE e1.salary > (
            SELECT AVG(e2.salary)
            FROM employees e2
            WHERE e1.department_id = e2.department_id
          )
        `;
        break;
      case '67':
        query = `SELECT employee_id FROM employees WHERE department_id IS NULL`;
        break;
      case '68':
        query = `
          SELECT employee_id, first_name, last_name
          FROM employees
          WHERE employee_id IN (
            SELECT employee_id FROM job_history GROUP BY employee_id HAVING COUNT(*) > 1
          )
        `;
        break;
      case '69':
        query = `
          SELECT department_id, COUNT(*) AS emp_count
          FROM employees
          GROUP BY department_id
        `;
        break;
      case '70':
        query = `
          SELECT job_id, SUM(salary) AS total_salary
          FROM employees
          GROUP BY job_id
        `;
        break;
      case '71':
        query = `
          SELECT department_id, AVG(commission_pct) AS avg_commission
          FROM employees
          WHERE commission_pct IS NOT NULL
          GROUP BY department_id
        `;
        break;
      case '72':
        query = `
          SELECT c.country_name, MAX(e.salary) AS max_salary
          FROM employees e
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
          GROUP BY c.country_name
        `;
        break;
      case '73':
        query = `
          SELECT j.job_title, d.department_name, e.first_name, e.last_name, jh.start_date
          FROM job_history jh
          JOIN jobs j ON jh.job_id = j.job_id
          JOIN departments d ON jh.department_id = d.department_id
          JOIN employees e ON jh.employee_id = e.employee_id
          WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31'
        `;
        break;
      case '74':
        query = `
          SELECT c.country_name, l.city, COUNT(d.department_id) AS dept_count
          FROM departments d
          JOIN employees e ON d.department_id = e.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
          GROUP BY c.country_name, l.city
          HAVING COUNT(e.employee_id) >= 2
        `;
        break;
      case '75':
        query = `
          SELECT e.first_name, e.last_name, j.job_title, jh.start_date, jh.end_date
          FROM employees e
          JOIN job_history jh ON e.employee_id = jh.employee_id
          JOIN jobs j ON jh.job_id = j.job_id
          WHERE e.commission_pct IS NULL
        `;
        break;
      case '76':
        query = `
          SELECT e.employee_id, e.first_name, e.last_name, c.country_name
          FROM employees e
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          JOIN countries c ON l.country_id = c.country_id
        `;
        break;
      case '77':
        query = `
          SELECT e.first_name, e.last_name, e.salary, e.department_id
          FROM employees e
          WHERE salary = (
            SELECT MIN(salary)
            FROM employees
            WHERE department_id = e.department_id
          )
        `;
        break;
      case '78':
        query = `
         SELECT *
FROM employees e
WHERE 2 = (
  SELECT COUNT(DISTINCT salary)
  FROM employees
  WHERE salary > e.salary
);

        `;
        break;
      case '79':
        query = `
          SELECT e.employee_id, e.first_name, e.last_name, e.salary
          FROM employees e
          WHERE e.salary > (SELECT AVG(salary) FROM employees)
            AND e.department_id IN (
              SELECT department_id
              FROM employees
              WHERE first_name LIKE '%J%' OR last_name LIKE '%J%'
            )
        `;
        break;
      case '80':
        query = `
          SELECT e.first_name, e.last_name, e.employee_id, j.job_title
          FROM employees e
          JOIN jobs j ON e.job_id = j.job_id
          JOIN departments d ON e.department_id = d.department_id
          JOIN locations l ON d.location_id = l.location_id
          WHERE l.city = 'Toronto'
        `;
        break;
      default:
        return res.status(404).json({ error: 'Query not found for that assignment number.' });
    }
  
    try {
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
    

