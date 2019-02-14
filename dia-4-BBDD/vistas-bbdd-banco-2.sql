
-- CREATE view view_actualizarsaldorecepcion as
--   select cb.idcuenta_bancaria as cuenta, cb.saldo as `Saldo anterior`, sum(t.cantidad) as movimientos, sum(t.cantidad+cb.saldo) as `Saldo actual` 
--   from cuenta_bancaria as cb
--   inner join transacciones as t on t.idcuentadestino = cb.idcuenta_bancaria
-- --   where t.fechatransaccion = CURDATE()
--   group by cb.idcuenta_bancaria, cb.saldo
-- 

-- select * from view_actualizarsaldorecepcion; 

 update  cuenta_bancaria
 inner join view_actualizarsaldorecepcion as va on cuenta_bancaria.idcuenta_bancaria = va.cuenta
 set saldo = va.`Saldo actual`
 where cuenta_bancaria.idcuenta_bancaria = va.cuenta;
  
  --  CREATE view view_actualizarsaldoemision as
--    select cb2.idcuenta_bancaria as cuenta, cb2.saldo as `Saldo anterior`, sum(0-t2.cantidad) as movimientos, sum(cb2.saldo-t2.cantidad) as `Saldo actual` 
--    from cuenta_bancaria as cb2
--    inner join transacciones as t2 on t2.idcuentaorigen = cb2.idcuenta_bancaria
-- -- --   where t.fechatransaccion = CURDATE()
--    group by cb2.idcuenta_bancaria, cb2.saldo;
-- --   
  -- 
--   select * from view_actualizarsaldoemision;
  
  -- update cuenta_bancaria,view_actualizarsaldo
  
  