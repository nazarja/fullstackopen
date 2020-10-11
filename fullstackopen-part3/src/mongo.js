const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const args = process.argv;
const length = args.length;

// args usage
if (length < 3 || length > 5) {
    let usage = '';
    usage += 'Usage -- Required arguments: \n';
    usage += 'password                    - get all persons from phonebook.\n';
    usage += 'password name number        - add a person to phonebook.\n';
    console.log(usage);
    // eslint-disable-next-line no-undef
    process.exit(1);
}


// connect to mongoose
const mongoURI = `mongodb+srv://nazarja:${args[2]}@cluster0-ejuew.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true });


// create schema and model
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Person = mongoose.model('Person', personSchema);


if (length === 3) {
    Person.find({})
        .then(res => {
            let result = 'Phonebook: \n';
            res.forEach(person => result += `${person.name} ${person.number} \n`);

            console.log(result);
            mongoose.connection.close();
        })
        .catch(err => console.log(err));
}
else {
    const person = new Person({
        name: args[3],
        number: args[4]
    });

    person.save()
        .then(res => {
            console.log(`Added ${res.name} number ${res.number} to phonebook.`);
            mongoose.connection.close();
        })
        .catch(err => console.log(err));
}
