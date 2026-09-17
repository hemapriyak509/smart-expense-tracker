package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.entity.Expense;
import com.expensetracker.expensetracker.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    // READ ALL
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Integer id) {
        return expenseService.getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Integer id,
            @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Integer id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("Expense deleted successfully");
    }
}
