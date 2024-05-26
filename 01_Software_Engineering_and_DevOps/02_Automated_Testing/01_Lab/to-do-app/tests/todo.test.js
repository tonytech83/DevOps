// Verify if a user can add a task 
const { test, expect } = require('@playwright/test');

test('Test if a user can add task', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.fill('#task-input', 'New test task');
  await page.click('#add-task');

  const taskText = await page.textContent('.task')

  expect(taskText).toContain('New test task');
});

// Verify if a user can delete a task
test('Test if a user can delete a task', async ({ page }) => {
  // Add task
  await page.goto('http://127.0.0.1:5500/');
  await page.fill('#task-input', 'Delete task');
  await page.click('#add-task');

  // Delete the task
  await page.click('.task .delete-task');

  const tasks = await page.$$eval('.task', task => task
    .map(task => task.textContent)
  );

  expect(tasks).not.toContain('Delete task');
})

test('Test if a user can complete a task', async ({ page }) => {
  // Add task
  await page.goto('http://127.0.0.1:5500/');
  await page.fill('#task-input', 'Complete task');
  await page.click('#add-task');

  // Complete the task
  await page.click('.task .task-complete');

  const completedTask = await page.$('.task.completed')

  expect(completedTask).not.toBeNull();
});

// Verify if a user can filter
test('Test if a user can filter tasks', async ({ page }) => {
  // Add task
  await page.goto('http://127.0.0.1:5500/');
  await page.fill('#task-input', 'Task 1');
  await page.click('#add-task');

  // Mark the task as completed
  await page.click('.task .task-complete');

  // Filter tasks
  await page.selectOption('#filter', 'Completed');

  const incompleteTasks = await page.$('task:not(.completed)');

  expect(incompleteTasks).toBeNull();
})