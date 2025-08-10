package controller;

import entity.Customer;
import entity.dto.CustomerDTO;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.CustomerServiceImpl;
import java.util.List;
import java.util.Map;

@Path("/api/customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class CustomerController {

    @Inject
    CustomerServiceImpl customerService;

    @POST
    public Response save(CustomerDTO customerDTO){
        try {
            Customer customer = customerService.save(customerDTO);
            return Response.status(Response.Status.CREATED).entity(customer).build();
        } catch (Exception e) {
            String errorMsg = "Error al guardar el cliente: " + e.getMessage();
            return Response.status(Response.Status.BAD_REQUEST).entity(errorMsg).build();
        }
    }

    @GET
    public List<Customer> getAll(){
        return customerService.findAll();
    }

    @GET
    @Path("/{id}")
    public Customer findById(@PathParam("id") Integer id){
        return customerService.findById(id);
    }

    @DELETE
    @Path("/{id}")
    public void deleteById(@PathParam("id") Integer id){
        customerService.deleteById(id);
    }

    @PUT
    public Customer update(Customer customer){
        Customer existing = customerService.findById(customer.getId());
        existing.setFirstName(customer.getFirstName());
        existing.setLastName(customer.getLastName());
        existing.setEmail(customer.getEmail());
        return customerService.update(existing);
    }
}
