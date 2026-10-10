-- 1. Listar pacientes com o nome da unidade de saúde

SELECT
    patients.id,
    patients.name AS patient_name,
    patients.cpf,
    patients.birth_date,
    patients.phone,
    health_units.name AS health_unit_name
FROM patients
INNER JOIN health_units
    ON patients.health_unit_id = health_units.id
ORDER BY patients.name;


-- 2. Contar quantos pacientes existem por unidade de saúde,
-- incluindo unidades sem pacientes

SELECT
    health_units.id,
    health_units.name AS health_unit_name,
    COUNT(patients.id) AS total_patients
FROM health_units
LEFT JOIN patients
    ON patients.health_unit_id = health_units.id
GROUP BY
    health_units.id,
    health_units.name
ORDER BY health_units.name;


-- 3. Buscar pacientes cujo nome contenha um termo

SELECT
    id,
    name,
    cpf,
    birth_date,
    phone,
    health_unit_id
FROM patients
WHERE name LIKE '%Carlos%'
ORDER BY name;