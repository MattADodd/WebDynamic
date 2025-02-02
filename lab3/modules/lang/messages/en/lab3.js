const message = {
    name: "Guest",
    date: "",
    get niceDay() {
        return `<div style="color:blue;"> Hello ${this.name}, What a beautiful day. Server current date and time is ${this.date}. </div>`;
    },
    append: "Text appended to file",
    appendError: "Error appending to file",
    file: "File created and text written.",
    fileError: "Error creating file.",
    fileNotFound: "Error, file not found: ",
    guest: "Guest"
};

module.exports = {message};