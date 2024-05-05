import React from "react";

const ModalCont = () => {
    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Dejanos tus comentarios</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Dejar comentario</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>

                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Agradecemos tu preferencia:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Enviar comentario</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ModalCont;