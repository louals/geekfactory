# Bidding System Testing Guide

Follow these steps to verify that the bidding system is working correctly.

## Prerequisites

- Ensure the backend server is running and accessible.
- Ensure you have an **Admin Account** and a separate **User Account**.

---

## **Step 1: Admin Configuration (Enable Bidding)**

1.  **Log in as Admin**:
    *   Navigate to `/login`.
    *   Enter your admin credentials.

2.  **Access Inventory**:
    *   Go to the **Admin Dashboard** (`/admin`).
    *   Click on **Inventory** (`/admin/inventory`).

3.  **Start an Auction**:
    *   Find a product in the list.
    *   Click the **Gavel Icon** (🔨) in the actions column.
    *   In the dialog:
        *   **Start Price**: Set a starting bid (e.g., `100`).
        *   **Start Time**: Set to *Current Time* (or slightly past).
        *   **End Time**: Set to a future date (e.g., tomorrow).
    *   Click **Start Auction**.
    *   *Verify*: You should see a success toast notification.

---

## **Step 2: Public View (Verify Auction)**

1.  **Navigate to Auctions Page**:
    *   Click on **Auctions** in the main navigation bar (or go to `/auctions`).

2.  **Check Listing**:
    *   Ensure the product you just enabled appears in the "**Live Auctions**" grid.
    *   *Verify*: The current bid should match your starting price.
    *   *Verify*: The "Live" badge should be visible (if the start time has passed).

---

## **Step 3: User Interaction (Place a Bid)**

1.  **Switch Account**:
    *   Log out of your admin account.
    *   Log in with a **Standard User** account (or register a new one).

2.  **Place a Bid**:
    *   Go to the **Auctions Page** (`/auctions`).
    *   Click on the product to view details (`/auctions/[id]`).
    *   In the "Place Your Bid" section:
        *   Enter an amount **higher** than the current price (e.g., `150`).
        *   Click **Bid Now**.
    *   *Verify*: You should see a success message.
    *   *Verify*: The "Current Bid" displayed on the page should update to your amount.
    *   *Verify*: Your name/bid should appear in the "Recent Bids" table at the bottom.

3.  **Check "My Bids"**:
    *   Click your profile icon in the navbar -> **My Bids**.
    *   *Verify*: The product should appear in the list with status **"Highest Bidder"**.

---

## **Step 4: Competitive Bidding (Optional)**

1.  **Outbid Yourself (or use another account)**:
    *   (Optional) Log in as a *different* user.
    *   Go to the same auction.
    *   Place a higher bid (e.g., `200`).

2.  **Verify Updates**:
    *   The page should update to show the new highest bid.
    *   If you check your previous user's "My Bids" page, the status should change to **"Outbid"** (yellow badge).

---

## **Troubleshooting**

*   **Auction not showing?**
    *   Check if the *Start Time* is in the past and *End Time* is in the future.
    *   Ensure the product is set to **Active**.
*   **Cannot place bid?**
    *   Ensure you are logged in.
    *   Ensure your bid is strictly higher than the current price.
    *   Check console logs for API errors.

