create database tienda 
go
use tienda 

go

create table producto (
	id_producto int primary key identity,
	nombre_producto varchar(200),
	precio varchar(50),
	cantidad_producto tinyint
)

go



go

create table persona (
	id_persona int primary key identity,
	nombre_persona varchar(100)
)

go

create table registro (
	id_registro int primary key identity,
	fecha date,
	cantidad_registro tinyint, 
	pagado bit, -- 1 = pagado || 0 = sin pagar
	fk_id_persona int foreign key references persona (id_persona),
	fk_id_producto  int foreign key references producto (id_producto)
)


go

create procedure fiar 

@cantidad tinyint,
@persona int, 
@producto int
as
begin 

insert into registro values (convert( date , getdate()),@cantidad,0,@persona,@producto )  

update producto set cantidad_producto = (cantidad_producto - @cantidad ) where id_producto = @producto

end

go


create procedure flush 
@id_registro int
as
begin  

	update registro set pagado = 1 where id_registro  =@id_registro

end


go


alter view debe_parcial
as
select  id_persona, pagado,
		nombre_producto,  sum(cantidad_registro) cant,  sum(cantidad_registro) * precio sub_total, precio

from persona per
inner join registro r on per.id_persona = r.fk_id_persona
inner join producto p on p.id_producto = r.fk_id_producto
group by  id_persona, nombre_producto, nombre_persona, precio,pagado

go

create view debe_completo  
as
select  id_persona, pagado, id_registro,fecha,
		nombre_producto,  sum(cantidad_registro) cant,  sum(cantidad_registro) * precio sub_total, precio

from persona per
inner join registro r on per.id_persona = r.fk_id_persona
inner join producto p on p.id_producto = r.fk_id_producto
group by  id_persona, nombre_producto, nombre_persona, precio,pagado , id_registro,fecha


go	

/*
	Ventas hechas por alguien 
	entre las fechas tales


*/

create view ventas 
as
select 
nombre_producto, 
cantidad_producto cantidad_actual, 
(sum(cantidad_registro))  cantidad_vendida,  
(sum(cantidad_registro) * precio)   total
from registro r
inner join producto p on p.id_producto = r.fk_id_producto
group by nombre_producto, cantidad_producto, precio







