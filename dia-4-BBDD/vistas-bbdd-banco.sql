-- Vista de dirección completa

-- create view `direccioncompleta` as-- 
-- select d.calle, d.numero, d.piso, d.codigopostal,m.nombre,p.nombre,pa.nombre from direccion as d
-- inner join municipio as m on m.idmunicipio = d.idmunicipio
-- inner join  provincia as p on p.idprovincia = m.idprovincia
-- inner join pais as pa on pa.idpais = p.idpais;

-- Vista de cuentas con saldo negativo
-- create view `cuentassaldonegativo` as
-- select ct.nombre, ct.apellidos, ct.telefono, c.numerodecuenta, c.saldo from cuenta_bancaria as c
-- inner join cliente as ct on ct.idcliente = c.idcliente
-- where c.saldo < 0;

-- Cambios en las cuentas durante el día....(sumar todas las transacciones del día actual y dar el saldo por cuenta y la diferencia de las transacciones del día)
-- Hoy tenemos 100€, y hemos recibido 2 transaccones de 5 y 7€, la vista tendria que dar 100, 12 y 112 (saldo, variacion y nuevo saldo)
-- Al final he hecho 2 vistas una por emision y otra por recepción. 

-- CREATE view view_actualizarsaldorecepcion as
--   select cb.idcuenta_bancaria as cuenta, cb.saldo as `Saldo anterior`, sum(t.cantidad) as movimientos, sum(t.cantidad+cb.saldo) as `Saldo actual` 
--   from cuenta_bancaria as cb
--   inner join transacciones as t on t.idcuentadestino = cb.idcuenta_bancaria
-- --   where t.fechatransaccion = CURDATE()
--   group by cb.idcuenta_bancaria, cb.saldo
-- 

-- select * from view_actualizarsaldorecepcion; 
-- -- 

    -- Calcular saldo por emision, es decir resta del saldo
--  CREATE view view_actualizarsaldoemision as
--    select cb2.idcuenta_bancaria as cuenta, cb2.saldo as `Saldo anterior`, sum(0-t2.cantidad) as movimientos, sum(cb2.saldo-t2.cantidad) as `Saldo actual` 
--    from cuenta_bancaria as cb2
--    inner join transacciones as t2 on t2.idcuentaorigen = cb2.idcuenta_bancaria
-- -- --   where t.fechatransaccion = CURDATE()
--    group by cb2.idcuenta_bancaria, cb2.saldo;
-- --   
  -- 
--   select * from view_actualizarsaldoemision;

-- Posiciones de un cliente: Cliente, numero de cuentas, saldo establecido.
-- create view `posicionescliente` as
  -- select c.nombre, c.apellidos, sum(cb.saldo), count(*) as  'numero de cuentas' from cliente as c
--    inner join cuenta_bancaria as cb on cb.idcliente = c.idcliente
--    group by c.nombre, c.apellidos,c.idcliente;
-- -- -- 
-- Insertamos país y provincias
-- insert into pais (nombre,idiso) values ('España','ES');
-- insert into provincia (codigo,nombre,idpais) values (02,'Albacete',1);

-- Creamos una funcion para cargar las provincias
--  DELIMITER //
-- -- 
--  CREATE PROCEDURE insertarprovincia (in codigovar int, in nombrevar varchar(45), in idpaisvar int)
--  BEGIN
--  INSERT INTO provincia (codigo,nombre,idpais) values (codigovar,nombrevar,idpaisvar);
--  END//
-- 
--  DELIMITER // 
-- -- -- 
--  CALL insertarprovincia (04,'Almería',1);
--  CALL insertarprovincia (01,'Araba/Álava',1);
--  CALL insertarprovincia (33,'Asturias',1);
--  CALL insertarprovincia (05,'Ávila',1);
--  CALL insertarprovincia (06,'Badajoz',1);
--  CALL insertarprovincia (07,'Balears, Illes',1);
--  CALL insertarprovincia (08,'Barcelona',1);
--  CALL insertarprovincia (48 ,'Bizkaia',1);
--  CALL insertarprovincia (09,'Burgos',1);
--  CALL insertarprovincia (10,'Cáceres',1);
--  CALL insertarprovincia (11,'Cádiz',1);
--  CALL insertarprovincia (39,'Cantabria',1);
--  CALL insertarprovincia (12,'Castellón/Castelló',1);
--  CALL insertarprovincia (13,'Ciudad Real',1);
--  CALL insertarprovincia (14,'Córdoba',1);
--  CALL insertarprovincia (15,'Coruña, A',1);
 -- CALL insertarprovincia (16 ,'Cuenca',1);
--  CALL insertarprovincia (20 ,'Gipuzkoa',1);
--  CALL insertarprovincia (17,'Girona',1);
--  CALL insertarprovincia (18,'Granada',1);
--  CALL insertarprovincia (19,'Guadalajara',1);
--  CALL insertarprovincia (21,'Huelva',1);
--  CALL insertarprovincia (22,'Huesca',1);
--  CALL insertarprovincia (23,'Jaén',1);
--  CALL insertarprovincia (24,'León',1);
--  CALL insertarprovincia (25,'Lleida',1);
--  CALL insertarprovincia (27,'Lugo',1);
--  CALL insertarprovincia (28,'Madrid',1);
--  CALL insertarprovincia (29,'Málaga',1);
--  CALL insertarprovincia (30,'Murcia',1);
--  CALL insertarprovincia (31,'Navarra',1);
--  CALL insertarprovincia (32,'Ourense',1);
--  CALL insertarprovincia (34,'Palencia',1);
--  CALL insertarprovincia (35,'Palmas, Las',1);
--  CALL insertarprovincia (36,'Pontevedra',1);
--  CALL insertarprovincia (26,'Rioja, La',1);
--  CALL insertarprovincia (37,'Salamanca',1);
--  CALL insertarprovincia (38,'Santa Cruz de Tenerife',1);
--  CALL insertarprovincia (40,'Segovia',1);
--  CALL insertarprovincia (41,'Sevilla',1);
--  CALL insertarprovincia (42,'Soria',1);
--  CALL insertarprovincia (43,'Tarragona',1);
--  CALL insertarprovincia (44,'Teruel',1);
--  CALL insertarprovincia (45,'Toledo',1);
--  CALL insertarprovincia (46,'Valencia/València',1);
--  CALL insertarprovincia (47,'Valladolid',1);
--  CALL insertarprovincia (49,'Zamora',1);
--  CALL insertarprovincia (50,'Zaragoza',1);
--  CALL insertarprovincia (51,'Ceuta',1);
--  CALL insertarprovincia (52,'Melilla',1);
 
-- DROP PROCEDURE insertarprovincia;


-- Creamos una función para cargar municipios

-- -  DELIMITER //
-- -- -- 
--   CREATE PROCEDURE insertarmunicipio (in codigovar int, in nombrevar varchar(45), in idprovinciavar int)
--   BEGIN
--   INSERT INTO municipio (codigo,nombre,idprovincia) values (codigovar,nombrevar,idprovinciavar);
--   END//
-- -- 
--   DELIMITER // 
-- 

-- call insertarmunicipio (30,'Coruña, A',19);
-- call insertarmunicipio (18,'Capela, A',19);
-- call insertarmunicipio (37,'Fisterra',19);
-- call insertarmunicipio (52,'Muxía',19);
-- call insertarmunicipio (82,'Teo',19);

-- DROP PROCEDURE insertardireccion; 

-- DELIMITER //
-- -- -- 
-- CREATE PROCEDURE insertardireccion (in callevar varchar(45), in numerovar varchar(3), in pisovar varchar(3), in codigopostalvar varchar(6), in idmunicipiovar int(11))
--  BEGIN
-- INSERT INTO direccion (calle,numero,piso,codigopostal,idmunicipio) VALUES (callevar,numerovar,pisovar,codigopostalvar,idmunicipiovar);
--  END//
-- -- -- 
--  DELIMITER //
-- -- -- 

 -- CALL insertardireccion ('Juan Flórez','12','bjo','15006',1);
-- CALL insertardireccion ('Nicaragua','1','3','15006',1);
 
 -- Creamos al empleado
 -- INSERT INTO empleado (nombre,apellidos,dni,fechaimpcorporacion,iddireccion,salarionmensual,telefono) 
--  VALUES ('Pedro','Alonso','32818535l','2018-12-1',1,3000,'685124578'); 
-- 

-- Creamos el banco
-- INSERT INTO banco (nombre,codigo,iddireccion,idpresidente,cif) VALUES ('BBVA','0082',2,1,'A32845784');

-- Creamos un cliente

-- INSERT INTO cliente (nombre,apellidos,dni,fechadealta,iddireccion,telefono,email) 
-- VALUES		('Antonio','Román','32874524l','2018-12-02',1,'654784512','antonio@gmail.com');
-- 

-- Creamos una oficina

-- INSERT INTO oficina (nombre,iddireccion,codigo,idbanco) VALUES ('Nicaragua',2,'452',1);

--    creamos el tipo de cuenta
-- 
-- INSERT INTO tipo_cuenta (nombre,codigocorto) VALUES ('Personal','P');
-- INSERT INTO tipo_cuenta (nombre,codigocorto) VALUES ('Caja','C');
-- Creamos la cuenta
-- 
-- INSERT INTO cuenta_bancaria (numerodecuenta,idcliente,idoficina,saldo,fechasaldo,idtipodecuenta,nombre,activa)
--  VALUES             ('6543216546897654',1,1,0,'2018-12-03',1,'Gastos',1);
-- 

