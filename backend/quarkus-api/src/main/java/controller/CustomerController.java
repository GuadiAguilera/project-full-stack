package controller;

import entity.Customer;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import service.serviceInterface.CustomerService;

import java.util.List;

@Path("/api/customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class CustomerController {

    @Inject
    CustomerService customerService;

    @POST
    public Customer save(Customer customer){
        return customerService.save(customer);
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
