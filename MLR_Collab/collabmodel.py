#Import the data

import pandas as pd 

df_orders = pd.read_csv('/content/drive/MyDrive/Intex2/Dataset/Orders.csv') 
df_lineitems = pd.read_csv('C:\\Users\\ethan\\source\\repos\INTEX2\frontend\INTEX2Frontend\MLR_Collab\LineItems.csv')
df_products = pd.read_csv('/content/drive/MyDrive/Intex2/Dataset/Products.csv', encoding='cp1252')

#Combine Orders and LineItems tables to create a user-item interaction matrix
interactions = pd.merge(df_orders[['transaction_ID', 'customer_ID']], df_lineitems[['transaction_ID', 'product_ID', 'rating']], on='transaction_ID')

interactions.head()