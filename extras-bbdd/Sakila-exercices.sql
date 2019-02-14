-- Which actors have the first name ‘Scarlett’
-- 
-- select first_name, last_name from actor
-- where first_name = 'Scarlett';

-- Which actors have the last name ‘Johansson’

-- select first_name, last_name from actor
-- where last_name = 'Johansson';
-- 

-- How many distinct actors last names are there?
-- select count(distinct last_name)  from actor
-- 


-- Which last names are not repeated?

 -- select distinct last_name from actor
--  group by last_name
--  having count(last_name)<2;
-- 

-- Which last names appear more than once?

-- select last_name from actor
-- group by last_name
-- having count(last_name)>1;
-- -- 
-- Which actor has appeared in the most films?



-- Is ‘Academy Dinosaur’ available for rent from Store 1?
-- Insert a record to represent Mary Smith renting ‘Academy Dinosaur’ from Mike Hillyer at Store 1 today .
-- When is ‘Academy Dinosaur’ due?
-- What is that average running time of all the films in the sakila DB?
-- What is the average running time of films by category?
-- Why does this query return the empty set?
-- 
