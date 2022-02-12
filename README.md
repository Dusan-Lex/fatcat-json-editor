# React Engineer task 

## JSON Editor 

This is a react task that I received from a software company in Serbia during the selection process. 

This is how I solved that task.

Live : https://fatcat-json-editor.vercel.app/

### Task requirements

Create an application that will take a RANDOM GENERATED JSON file and create a renderer and editor for the JSON file.

The system should create a page where for every array member in the JSON file we
will see a row with property->value and under it input fields to edit the value for every
property of the array member.

So basically a row where we view data of array member of the JSON file and a row
where we edit data of that array member. The page will render these groups for every
array member. If the JSON has 10 array members, it will render 10 groups of 2 rows. If
it has 1000 array members, it will render 1000 groups of 2 rows.
It is important to note that all these items are on the same page.
There is no pagination, and everything is always visible.

### How is the edit system generated?

- If the id field exists, it will not have an input field for editing.
- If the value is a string, it will create an input field with type text.
- If the value is a number, it will create an input field with a number as a type.
- If the value is email, it will create an input field with email as type.
- If the value is a date, it will use a html date picker.
- If the value is boolean, it will use a radio button with “true/false”.
- If the field value is a long text, use the textarea field.
- If the field value is another JSON, just ignore it.

There is no need for data validation.\
There is no need for a fancy UI.

#### NOTES:
- Task must be done in Typescript
- React must be used for the front-end
- You can use Redux, or Context, or just state to manage your data.
- Performance is important. The JSON file can have unlimited data, so think it
through.
- With this task you must provide a JSON file with 1000 rows at minimum and
you can use https://www.json-generator.com/ to build your json file with ease.
