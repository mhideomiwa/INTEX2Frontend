#Import data 
import pandas as pd
import numpy as np 
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.ensemble import ExtraTreesClassifier

import onnx
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType


#Import orders dataset
df_orders = pd.read_csv(r'MLR_Fraud\Orders.csv')

#Import Line items dataset
df_items = pd.read_csv(r'MLR_Fraud\LineItems.csv')

#Join the tables
df = pd.merge(df_orders, df_items, on='transaction_ID', how='inner')

#Since 18 missing addresses doesnt amount to much, we will just drop them
df.dropna(subset=['shipping_address'], inplace=True)
df = df.drop(['transaction_ID', 'customer_ID', 'rating'], axis=1)

#Fix the date column because this format is not useful 
#Convert to datetime 
df['date'] = pd.to_datetime(df['date'])

df['month'] = df['date'].dt.month

df = df.drop('date', axis=1)

#Generate dummy codes 
df = pd.get_dummies(df, columns = ['day_of_week', 'entry_mode', 'type_of_transaction', 'country_of_transaction', 'shipping_address', 'bank', 'type_of_card'], drop_first=True)
df = df.astype(int)

#Determine X and y features 
y = df['fraud'] #Label
X = df.drop(columns=['fraud'])
X = X.select_dtypes(np.number)

#Split the dataset training and testing 50/50
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=1)

#Train/fit the model
#Create Decision Tree object
clf = ExtraTreesClassifier(n_estimators=100, random_state=1).fit(X_train, y_train).score(X_test, y_test)

#Train the Decision Tree
clf = clf.fit(X_train, y_train)

# Converting the model to ONNX format
initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onnx_model = convert_sklearn(clf, initial_types=initial_type)

# Saving the model
with open("decision_tree_model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())