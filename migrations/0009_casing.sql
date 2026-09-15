-- Brand is always lowercase. Safe to re-run: no-op once strings are already lower.
update products
  set description = replace(description, 'FleshSesh', 'fleshsesh'),
      title = replace(title, 'FleshSesh', 'fleshsesh'),
      subtitle = replace(subtitle, 'FleshSesh', 'fleshsesh')
  where description like '%FleshSesh%'
     or title like '%FleshSesh%'
     or subtitle like '%FleshSesh%';

update course_modules
  set body = replace(body, 'FleshSesh', 'fleshsesh'),
      title = replace(title, 'FleshSesh', 'fleshsesh')
  where body like '%FleshSesh%'
     or title like '%FleshSesh%';
