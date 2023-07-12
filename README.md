This is a simple backend based on nodejs and express which manages CRUD operations on MySQL database.

The routes for the operations are - 

  1) "/contact/create" - POST operation which takes all the data to be added on the body and adds to remote MySQL database.

  2) "/contact/get" - GET operation which takes id and returns the data related to this id.

  3) "/contact/update" - PATCH operation which takes all the data to be updated and id where it should be updated, and updates the data on MySQL server.

  4) "/contact/delete" - DELETE operation which takes only id and deletes data related to that id and returns the operation is success or fail.

Thank You.
