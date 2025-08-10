package service;

import entity.Customer;
import entity.dto.CustomerDTO;
import entity.dto.CustomerMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import repository.CustomerRepository;
import service.serviceInterface.CustomerService;

import java.util.List;
import java.util.NoSuchElementException;

@ApplicationScoped
public class CustomerServiceImpl implements CustomerService {

    @Inject
    CustomerRepository customerRepository;

    @Inject
    CustomerMapper customerMapper;

    @Override
    @Transactional
    public Customer save(CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        customerRepository.persist(customer);
        return customer;
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.listAll();
    }

    @Override
    public Customer findById(Integer id) {
        Customer c =  customerRepository.findByIdOptional(Long.valueOf(id))
                .orElseThrow(() -> new NoSuchElementException("Customer not found with ID: " + id));

        return c;
    }

    @Override
    public void deleteById(Integer id) {
        customerRepository.deleteById(Long.valueOf(id));
    }

    @Override
    public Customer update(Customer customer) {
        customerRepository.getEntityManager().merge(customer);
        return customer;
    }
}
