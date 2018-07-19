function addVaga()
{
    var nome = document.getElementById("nome").value;
    var desc = document.getElementById("descricao").value;
    var habs = document.getElementById("habilidades").value;
    var difs = document.getElementById("diferenciais").value;
    var salb = document.getElementById("salario").value;
    var area = document.getElementById("area").value;

    if (nome == null || nome == "")
        alert("Preencha um nome para a vaga");
    else
        if (desc == null || desc == "")
            alert("Preencha a descrição da vaga");
        else
            if (salb == null || salb == "")
                alert("Preencha o salário base da vaga");
            else
            {
                var linha = document.getElementById("linha").value;
                linha += 
                "<div class='col-12 col-sm-12 col-md-6 col-lg-4 mt-3 mb-3'>"+
                "<div class='card'>"+
                    "<img class='card-img-top' src='recursos/developer.png'>"+
                    "<div class='card-body'>"+
                        "<h5 class='card-title'>"+nome+"</h5>"+
                        "<p>"+
                            "<b>Descrição:</b><br>"+
                            desc+
                            "<br><b>Salário base:</b>"+
                            "<br>"+salb+
                        "</p>"+
                        "<button class='btn btn-warning' href='#'><i class='far fa-edit'></i></button>"+
                        "<button class='btn btn-danger' href='#'><i class='far fa-trash-alt'></i></button>"+
                    "</div>"+
                "</div>"+
            "</div>";
            }
}