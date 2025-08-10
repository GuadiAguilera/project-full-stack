package service.serviceInterface;

import entity.Customer;
import entity.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    Customer save(CustomerDTO customer);
    List<Customer> findAll();
    Customer findById (Integer id);
    void deleteById(Integer id);
    Customer update(Customer customer);
}
