import { QuestionData } from './types';

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    title: "Supplier Performance Metrics",
    description: "We need to know who our most active suppliers are. Identify the top 5 suppliers based on the total volume of components delivered in October 2024.",
    company: "Apple",
    difficulty: "Medium",
    status: "In Progress",
    tags: ["SQL", "Join", "Aggregation"],
    tables: [
      {
        tableName: "supplier_deliveries",
        columns: [
          { name: "supplier_id", type: "INTEGER" },
          { name: "delivery_date", type: "DATE" },
          { name: "component_count", type: "INTEGER" },
          { name: "manufacturing_region", type: "VARCHAR" }
        ],
        data: [
          { supplier_id: 101, delivery_date: '2024-10-01', component_count: 500, manufacturing_region: 'APAC' },
          { supplier_id: 102, delivery_date: '2024-10-02', component_count: 1200, manufacturing_region: 'EMEA' },
          { supplier_id: 101, delivery_date: '2024-10-05', component_count: 300, manufacturing_region: 'APAC' },
          { supplier_id: 103, delivery_date: '2024-10-10', component_count: 850, manufacturing_region: 'NA' },
          { supplier_id: 104, delivery_date: '2024-10-12', component_count: 2000, manufacturing_region: 'APAC' },
          { supplier_id: 105, delivery_date: '2024-10-15', component_count: 150, manufacturing_region: 'LATAM' },
          { supplier_id: 102, delivery_date: '2024-10-20', component_count: 900, manufacturing_region: 'EMEA' },
        ]
      },
      {
        tableName: "suppliers",
        columns: [
          { name: "supplier_id", type: "INTEGER" },
          { name: "supplier_name", type: "VARCHAR" }
        ],
        data: [
          { supplier_id: 101, supplier_name: 'Foxconn' },
          { supplier_id: 102, supplier_name: 'Pegatron' },
          { supplier_id: 103, supplier_name: 'Wistron' },
          { supplier_id: 104, supplier_name: 'TSMC' },
          { supplier_id: 105, supplier_name: 'Qualcomm' },
          { supplier_id: 106, supplier_name: 'Broadcom' },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Employee Retention and Satisfaction",
    description: "As a member of the Netflix HR team, you are tasked with addressing employee retention challenges by analyzing employee satisfaction data. Your goal is to identify trends in attrition by finding the average satisfaction score of employees who have left versus those who are still active.",
    company: "Netflix",
    difficulty: "Easy",
    status: "In Progress",
    tags: ["SQL", "Group By", "Avg"],
    tables: [
      {
        tableName: "employees",
        columns: [
          { name: "employee_id", type: "INTEGER" },
          { name: "department", type: "VARCHAR" },
          { name: "satisfaction_score", type: "INTEGER" },
          { name: "status", type: "VARCHAR" }
        ],
        data: [
            { employee_id: 1, department: 'Engineering', satisfaction_score: 8, status: 'Active' },
            { employee_id: 2, department: 'Sales', satisfaction_score: 3, status: 'Left' },
            { employee_id: 3, department: 'Engineering', satisfaction_score: 9, status: 'Active' },
            { employee_id: 4, department: 'HR', satisfaction_score: 4, status: 'Left' },
            { employee_id: 5, department: 'Sales', satisfaction_score: 7, status: 'Active' },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "User Engagement with Photo Categorization",
    description: "As a Data Analyst on the Google Photos Machine Learning Team, you are tasked with understanding user engagement with our automatic photo categorization features. Find the user_ids that have used the 'Search by Face' feature more than 10 times in the last 30 days.",
    company: "Google",
    difficulty: "Medium",
    status: "Not Started",
    tags: ["SQL", "Filtering", "Count"],
    tables: [
        {
            tableName: "feature_usage",
            columns: [
                { name: "log_id", type: "INTEGER" },
                { name: "user_id", type: "INTEGER" },
                { name: "feature_name", type: "VARCHAR" },
                { name: "timestamp", type: "DATETIME" }
            ],
            data: [
                { log_id: 1, user_id: 101, feature_name: "Search by Face", timestamp: "2024-10-01 10:00:00" },
                { log_id: 2, user_id: 101, feature_name: "Search by Face", timestamp: "2024-10-01 10:05:00" },
                { log_id: 3, user_id: 102, feature_name: "Auto Album", timestamp: "2024-10-02 11:00:00" },
                { log_id: 4, user_id: 101, feature_name: "Search by Face", timestamp: "2024-10-03 09:00:00" }
            ]
        }
    ]
  },
  {
    id: 4,
    title: "Facebook Marketplace Item Price Analyses",
    description: "Your Product Manager of Facebook Marketplace wants to understand how items are priced across cities to optimize the recommendation algorithm. Calculate the average price of items listed in 'San Francisco' and 'New York'.",
    company: "Meta",
    difficulty: "Easy",
    status: "Not Started",
    tags: ["SQL", "Avg", "Where"],
    tables: [
        {
            tableName: "listings",
            columns: [
                { name: "listing_id", type: "INTEGER" },
                { name: "city", type: "VARCHAR" },
                { name: "price", type: "DECIMAL" },
                { name: "category", type: "VARCHAR" }
            ],
            data: [
                { listing_id: 1, city: "San Francisco", price: 100.50, category: "Electronics" },
                { listing_id: 2, city: "New York", price: 80.00, category: "Electronics" },
                { listing_id: 3, city: "San Francisco", price: 200.00, category: "Furniture" },
                { listing_id: 4, city: "Austin", price: 50.00, category: "Clothing" }
            ]
        }
    ]
  },
  {
    id: 5,
    title: "Streaming Content Marathon Analysis",
    description: "Netflix wants to award users who binge-watch shows. Find all users who have watched at least 5 episodes of the same show in a single day.",
    company: "Netflix",
    difficulty: "Hard",
    status: "Not Started",
    tags: ["SQL", "Self Join", "Window Functions"],
    tables: [
        {
            tableName: "watch_history",
            columns: [
                { name: "watch_id", type: "INTEGER" },
                { name: "user_id", type: "INTEGER" },
                { name: "show_id", type: "INTEGER" },
                { name: "episode_id", type: "INTEGER" },
                { name: "watch_date", type: "DATE" }
            ],
            data: [
                { watch_id: 1, user_id: 500, show_id: 10, episode_id: 1, watch_date: "2024-11-01" },
                { watch_id: 2, user_id: 500, show_id: 10, episode_id: 2, watch_date: "2024-11-01" },
                { watch_id: 3, user_id: 500, show_id: 10, episode_id: 3, watch_date: "2024-11-01" },
                { watch_id: 4, user_id: 500, show_id: 10, episode_id: 4, watch_date: "2024-11-01" },
                { watch_id: 5, user_id: 500, show_id: 10, episode_id: 5, watch_date: "2024-11-01" },
                { watch_id: 6, user_id: 501, show_id: 10, episode_id: 1, watch_date: "2024-11-01" }
            ]
        }
    ]
  },
  {
    id: 6,
    title: "Server Downtime Impact",
    description: "AWS is analyzing server reliability. Write a query to find the total duration of downtime for each server_id where the downtime status was 'Unexpected'.",
    company: "Amazon",
    difficulty: "Hard",
    status: "Not Started",
    tags: ["SQL", "Time Delta", "Grouping"],
    tables: [
        {
            tableName: "server_logs",
            columns: [
                { name: "log_id", type: "INTEGER" },
                { name: "server_id", type: "INTEGER" },
                { name: "status", type: "VARCHAR" },
                { name: "start_time", type: "DATETIME" },
                { name: "end_time", type: "DATETIME" }
            ],
            data: [
                { log_id: 1, server_id: 1, status: "Unexpected", start_time: "2024-10-01 10:00:00", end_time: "2024-10-01 10:30:00" },
                { log_id: 2, server_id: 1, status: "Maintenance", start_time: "2024-10-02 01:00:00", end_time: "2024-10-02 02:00:00" },
                { log_id: 3, server_id: 2, status: "Unexpected", start_time: "2024-10-01 15:00:00", end_time: "2024-10-01 16:00:00" }
            ]
        }
    ]
  },
  {
    id: 7,
    title: "Ride Acceptance Rates by Time",
    description: "Uber wants to know the acceptance rate of rides during peak hours (7AM-9AM) versus off-peak hours.",
    company: "Uber",
    difficulty: "Medium",
    status: "Not Started",
    tags: ["SQL", "Case When", "Date Part"],
    tables: [
        {
            tableName: "ride_requests",
            columns: [
                { name: "request_id", type: "INTEGER" },
                { name: "request_time", type: "DATETIME" },
                { name: "status", type: "VARCHAR" }
            ],
            data: [
                { request_id: 1, request_time: "2024-10-01 08:30:00", status: "Accepted" },
                { request_id: 2, request_time: "2024-10-01 08:45:00", status: "Cancelled" },
                { request_id: 3, request_time: "2024-10-01 14:00:00", status: "Accepted" }
            ]
        }
    ]
  }
];