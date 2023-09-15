let box = document.forms.box;
let arr = [];
let tbody = document.getElementById('tbody');
let tr, td, indx;

let person = {
    counter: 1,
    login: "",
    pass: "",
    email: "",
    y: "user_edit",
    n: "user_delete"
}

let REGlogin = /^[a-zA-Z]{4,16}$/;
let REGpass = /^[a-zA-Z0-9_\-.]{4,16}$/;
let REGemail = /^[a-zA-Z0-9-_.]{1,}@[a-z]{1,}\.[a-z]{1,}$/;

let wrong_l = document.querySelector('.wrong_login');
let wrong_p = document.querySelector('.wrong_password');
let wrong_e = document.querySelector('.wrong_email');

document.querySelector('.add').addEventListener('click', function () {
    const clone = Object.assign({}, person);
    (REGlogin.test(box.for_login.value) == false) ?
        wrong_l.style.display = "block" : (clone.login = box.for_login.value, wrong_l.style.display = "none");

    (REGpass.test(box.for_password.value) == false) ?
        wrong_p.style.display = "block" : (clone.pass = box.for_password.value, wrong_p.style.display = "none");

    (REGemail.test(box.for_email.value) == false) ?
        wrong_e.style.display = "block" : (clone.email = box.for_email.value, wrong_e.style.display = "none");
        
    if (REGlogin.test(box.for_login.value) && REGpass.test(box.for_password.value) && REGemail.test(box.for_email.value) == true) {
        clone.counter = person.counter++;
        arr.push(clone);
        box.reset();
        Create();
    }
})

function Create() {
    $('#information tbody tr').remove();
    if (arr.length) {
        arr.forEach(function (user) {
            tr1 = document.createElement("tr");
            trUser = document.getElementById('tbody').appendChild(tr1);

            for (k in user) {
                td1 = document.createElement('td');
                trUser.appendChild(td1);
                if (user[k] == "user_edit") {
                    let edit_btn = document.createElement("button");
                    td1.appendChild(edit_btn);
                    edit_btn.setAttribute("class", "editing");
                    edit_btn.textContent = "EDITE";
                    edit_btn.addEventListener('click', editBTN);

                    function editBTN() {
                        indx = $(this).closest('td').closest('tr').index();
                        box.for_login.value = arr[indx].login;
                        box.for_password.value = arr[indx].pass;
                        box.for_email.value = arr[indx].email;
                        $('#add').css({ display: 'none' })
                        $('#edit').css({ display: 'block' })
                        $('.deleting').css({display: 'none'})
                    }
                }
                else if (user[k] == "user_delete") {
                    let delete_btn = document.createElement("button");
                    td1.appendChild(delete_btn);
                    delete_btn.setAttribute("class", "deleting");
                    delete_btn.textContent = "DELETE";
                    delete_btn.addEventListener('click', deleteUser);

                    function deleteUser() {
                        let del_tr = $(this).closest('td').closest('tr').index();
                        $(this).closest("tr").remove();
                        arr.splice(del_tr, 1);
                        for (let i = del_tr; i < arr.length; i++) {
                            arr[i].counter = arr[i].counter - 1;
                        }
                        person.counter = person.counter - 1;
                        Create();
                    }
                }
                else {
                    td1.innerText = user[k];
                }
            }
        })
    }
}

document.getElementById('edit').addEventListener('click', function () {
    const clone2 = Object.assign({}, person);
    (REGlogin.test(box.for_login.value) == false) ?
        wrong_l.style.display = "block" : (clone2.login = box.for_login.value, wrong_l.style.display = "none");

    (REGpass.test(box.for_password.value) == false) ?
        wrong_p.style.display = "block" : (clone2.pass = box.for_password.value, wrong_p.style.display = "none");

    (REGemail.test(box.for_email.value) == false) ?
        wrong_e.style.display = "block" : (clone2.email = box.for_email.value, wrong_e.style.display = "none");

    arr[indx].login = clone2.login;
    arr[indx].pass = clone2.pass;
    arr[indx].email = clone2.email;

    if (REGlogin.test(box.for_login.value) && REGpass.test(box.for_password.value) && REGemail.test(box.for_email.value) == true) {
        arr.splice(indx, clone2);
        box.reset();
        $('#information tbody tr').remove();
        Create();
        $('#add').css({ display: 'block' })
        $('#edit').css({ display: 'none' })
    }
});
