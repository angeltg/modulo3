-- SELECT * FROM film where film_id=1001;
-- select category.name from category inner join film_category on film_id = 1001;

-- select title as Titulo, length as Duracion, rental_rate as 'Precio alquiler', replacement_cost as 'Pago en caso de pérdida'
--  count(DISTINCT length) from film group by relase_year ;
-- 

-- select title as Titulo,  coalesce(l2.name,'Sin traducción')  as VO,l.name Nombre from film as f 
-- inner join language as l on f.language_id = l.language_id 
-- right join language as l2 on f.original_language_id = l2.language_id;  
-- 

-- select f.title as Título,count(*) as 'Cuantos actores', avg(length)
-- from film as f
-- inner join film_actor	as fa on f.film_id=fa.film_id
-- inner join actor as a on a.actor_id = fa.actor_id
-- group by f.title
-- order by title

-- select f.title, c.name from film as f, count(*)
-- inner join film_category as fc on f.film_id = fc.film_id
-- inner join category as c on fc.category_id = c.category_id
-- order by f.film_id desc;

-- 1a. El primer y último actor.
-- 
-- select first_name, last_name from actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name--

-- select  upper(concat(first_name, " ", last_name)) as 'Actor Name' from actor;


-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." 
--      What is one query would you use to obtain this information?
-- select actor_id, first_name, last_name from actor where first_name = 'Joe';

-- 2b. Find all actors whose last name contain the letters GEN:

-- select * from actor where first_name like '%GEN%'
-- 
-- 
-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:

-- select * from actor where last_name like '%LI%' order by last_name, first_name;
-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:

-- select * from country where country  in ('Afghanistan','Bangladesh','China');

-- 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.

-- alter table actor add column middle_name  varchar(256) null after first_name;

-- 3b. You realize that some of these actors have tremendously long last names. 
--  Change the data type of the middle_name column to blobs.

-- alter table actor CHANGE middle_name middle_name blob;

-- 3c. Now delete the middle_name column.
-- alter table actor drop column middle_name;

-- 4a. List the last names of actors, as well as how many actors have that last name

--  select last_name, count(*) from actor group by last_name;
-- 
-- 4b. List last names of actors and the number of actors who have that last name, 
--     but only for names that are shared by at least two actors

 -- select  last_name,  count(*)  as Cantidad from actor group by last_name having count(*)>=2;
 
 
-- 	4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, 
-- --     the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.

-- select first_name, last_name from actor where first_name = 'Harpo' and last_name='williams';

-- update actor set first_name = "Harpo" where  first_name = 'Groucho' and last_name='williams';


-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it ?

-- describe address;

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:

-- select s.first_name, s.last_name, a.address from staff as s
--  join address as a where s.address_id = a.address_id;
-- -- 
-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
 
 
 -- select sum(p.amount), s.first_name from staff as s
--  inner join payment as p on s.staff_id = p.staff_id
--  where p.payment_date > '2005-08-01' and p.payment_date < '2005-08-31'  group by s.staff_id;
-- 
-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.

-- select f.title from film as f
-- inner join film_actor as fa where fa.film_id = f.film_id;
-- 
-- select count(*) as 'Número de actores', f.title as Título from film_actor as fa
-- inner join film as f where f.film_id = fa.film_id group by fa.film_id;
--  

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?

-- select f.title as Título, count(*)  as 'Número de copias' from film as f
-- inner join inventory as i where i.film_id = f.film_id and f.title='Hunchback Impossible' group by f.film_id;
-- 
-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. 
-- --     List the customers alphabetically by last name:

-- select coalesce(sum(p.amount),0) as Facturado, c.last_name, c.first_name from payment as p
-- right join customer as c on c.customer_id = p.customer_id group by c.customer_id order by sum(p.amount);
-- 



-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, 
-- --  films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of
-- --  movies starting with the letters K and Q whose language is English.
-- 

-- select title as Título from film where title like 'K%' or title like 'q%';
-- 
-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.

-- select a.last_name, a.first_name from actor as a
-- inner join film_actor as fa on fa.actor_id = a.actor_id
-- inner join film as f on f.film_id = fa.film_id
-- where f.title = 'Alone trip';
-- 

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and 
-- --     email addresses of all Canadian customers. 
--     Use joins to retrieve this information.

-- select c.last_name, c.first_name, c.email from customer as c
-- inner join address as a on a.address_id = c.address_id
-- inner join city as ct on ct.city_id = a.city_id
-- inner join country as co on ct.country_id= co.country_id
-- where co.country = 'Canada';
-- 

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
--  Identify all movies categorized as famiy films.


-- select f.title from film as f
-- inner join film_category as fc on fc.film_id = f.film_id
-- inner join category as c on c.category_id = fc.category_id
-- where c.name = 'Family';
-- 

-- 7e. Display the most frequently rented movies in descending order.
-- select f.title, count(*) as Alquileres from film as f
-- inner join inventory as i on i.inventory_id = f.film_id
-- inner join rental as r on r.inventory_id = i.inventory_id
-- group by f.title
-- order by count(*) desc;
-- 
-- 7f. Write a query to display how much business, in dollars, each store brought in.

-- select s.store_id, sum(p.amount) from store as s 
-- inner join inventory as i on i.store_id = s.store_id
-- inner join rental as r on r.inventory_id = i.inventory_id
-- inner join payment as p on p.rental_id= r.rental_id
-- group by s.store_id;
-- 

-- 7g. Write a query to display for each store its store ID, city, and country.
-- 

-- select s.store_id, c.city, co.country from store as s
-- inner join address as a on a.address_id = s.address_id
-- inner join city as c on c.city_id = a.city_id
-- inner join country as co on co.country_id = c.country_id

-- 7h. List the top five genres in gross revenue in descending order. 
-- (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)


-- select  c.name as Categoría, sum(p.amount) as Recaudado from category as c
-- inner join film_category as fc on fc.category_id =  c.category_id
-- inner join inventory as i on fc.film_id = i.film_id
-- inner join rental as r on r.inventory_id = i.inventory_id
-- inner join payment as p on p.rental_id = r.rental_id
-- group by c.name
-- order by sum(p.amount) desc
-- limit 5;
-- 

-- 8a. In your new role as an executive, you would like to have an easy way of viewing 
--      the Top five genres by gross revenue. Use the solution from the problem above to create a view. 
--      If you haven't solved 7h, you can substitute another query to create a view.





-- create view view_5_generes as select  c.name as Categoría, sum(p.amount) as Recaudado from category as c
-- inner join film_category as fc on fc.category_id =  c.category_id
-- inner join inventory as i on fc.film_id = i.film_id
-- inner join rental as r on r.inventory_id = i.inventory_id
-- inner join payment as p on p.rental_id = r.rental_id
-- group by c.name
-- order by sum(p.amount) desc
-- limit 5;
-- 

-- 8b. How would you display the view that you created in 8a?
-- 
-- select * from view_5_generes;
-- 
-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
-- 
-- drop view if exists view_5_generes;

-- insert into actor (first_name,last_name) values ('Pedro','Alonso');
-- 
-- 1: how many actors have not acted in any films?
-- select  a.first_name from actor as a
-- where not exists (select fa.actor_id from film_actor as fa where fa.actor_id = a.actor_id);
-- 

-- 2: how many films are out on rent?
-- He sacado el número de copias que hay de cada peli pero no sé si refiere exactamente a esto.
-- -- select f.title, count(*) from film as f
-- inner join inventory as i on i.film_id = f.film_id
-- group by f.film_id;
-- 


-- 3: which movie category generated the highest collection form rental income, how much is it?

-- select c.name as nombre, sum(p.amount) as Importe from category as c
-- inner join film_category as fc on fc.category_id = c.category_id
-- inner join  film as f on f.film_id = fc.film_id
-- inner join inventory as i on i.film_id = f.film_id
-- inner join rental as r on r.inventory_id = i.inventory_id
-- inner join payment as p on p.rental_id=r.rental_id
-- group by c.category_id
-- order by sum(p.amount) desc
-- limit 1;
-- 



-- 4: what is the most common hour when people pay for a dvd rental?

-- select DATE_FORMAT(payment_date,'%H:%i:%s') as timer, count(*) as veces
--  from payment
--  group by timer
--  order by veces desc
--  limit 1;
-- 
-- 
-- 
-- 
-- 
-- Questions
-- 1. What are the names of all the languages in the database (sorted alphabetically)?
-- 
-- select name as Idioma from language
-- order by name;



-- 2. Return the full names (first and last) of actors with “SON” in their last name, ordered by their first
-- name.

-- select first_name as nombre, last_name as apellido from actor
-- where last_name like  '%SON%'
-- order by first_name;
-- 


-- 3. Find all the addresses where the second address is not empty (i.e., contains some text), and return
-- these second addresses sorted.

-- No devuelve nada ya que el campo address2 no está cubierto en ningún caso

-- select address_id as ID, address2 as 'Segunda dirección' from address
-- where address2 <> ''
-- order by address2;
-- 

-- 4. Return the first and last names of actors who played in a film involving a “Crocodile” and a “Shark”,
-- along with the release year of the movie, sorted by the actors’ last names.

 --  select a.first_name as Nombre, a.last_name as Apellido, ft.title as Pelicula, f.release_year from actor as a
--    inner join film_actor as fa on fa.actor_id = a.actor_id
--    inner join film as f on f.film_id = fa.film_id
--   inner join film_text as ft on ft.film_id = fa.film_id
-- where ft.description like '%Crocodile%' and ft.description like '%Shark%'
--   order by a.last_name;
-- -- -- 

-- 5. How many films involve a “Crocodile” and a “Shark”?
-- Son 10 las películas en las que aparecen estas palabras
--  select count(*) from film as f 
--   inner join film_text as ft on ft.film_id = f.film_id
--   where ft.description like '%SHARK%' and ft.description like '%Crocodile%';
--  


-- 6. Find all the film categories in which there are between 55 and 65 films. Return the names of these
-- categories and the number of films per category, sorted by the number of films.

-- select c.name as Categoría, count(*) as 'Número de peliculas' from film as f
-- inner join film_category as fc on fc.film_id = f.film_id
-- inner join category as c on c.category_id = fc.category_id
-- group by c.name
-- having count(*) between 55 and 65
-- order by count(*) desc;
-- 


-- 7. In how many film categories is the average difference between the film replacement cost and the
-- rental rate larger than 17?

-- Muestra por categorías la cantidad de películas cuya diferencia entre el precio de alquiler y el precio en caso de périda supera los 17 dólares

-- select c.name, count((f.replacement_cost - f.rental_rate) > 17) from film as f
-- inner join film_category as fc on fc.film_id = f.film_id
-- inner join category as c on c.category_id = fc.category_id
-- where f.replacement_cost - f.rental_rate > 17
-- group by c.name;
-- 

-- 8. Find the address district(s) name(s) such that the minimal postal code in the district(s) is maximal
-- over all the districts. Make sure your query ignores empty postal codes and district names.

-- Pide el distrito que tenga el código postal menor de su distrito que sea el mayor de todos los distritos?
 -- select district, postal_code from address
--  where postal_code <> '' and district <> ''
--  order by district, postal_code desc;
-- 
 
-- 9. Find the names (first and last) of all the actors and costumers whose first name is the same as the
-- first name of the actor with ID 8. Do not return the actor with ID 8 himself. Note that you cannot
-- use the name of the actor with ID 8 as a constant (only the ID). There is more than one way to solve
-- this question, but you need to provide only one solution.

select a.first_name, a.last_name, a.actor_id, c.first_name, c.last_name from customer as c
inner join	actor as a on a.actor_id = 8
where c.first_name = a.first_name;


-- 10. Give an interesting query of your own that is not already in the assignment. The query should
-- involve an aggregation operation, and a nested SELECT. Give, along with the query, the English
-- explanation and the answer.


