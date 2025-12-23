# AICE 실기 모의고사 2회 정답 및 해설

본 해설은 항공사 고객 만족도 분류 태스크를 다룹니다.
데이터 전처리, 다중 알고리즘 비교, 그리고 딥러닝 최적화 과정을 포함합니다.

<div style="background-color: #10B981; color: white; padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 16px; font-family: sans-serif; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #047857; padding: 6px 14px; border-radius: 8px; display: flex; align-items: center; gap: 8px; font-weight: bold; flex-shrink: 0; font-size: 14px;">
    참고 링크
  </div>
  <div style="flex-grow: 1; font-family: monospace; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; opacity: 0.9;">
    https://blog.naver.com/yiyangse/223488690089
  </div>
</div>

---

## 📋 [Part 1] 전처리 및 EDA

### 1. 데이터 로드 및 이상치 제거
항공사 만족도 데이터(`Invistico_Airline.csv`)를 로드하고 지연 시간 이상치를 처리합니다.

```python
import pandas as pd
from sklearn.impute import SimpleImputer

df = pd.read_csv('Invistico_Airline.csv')

# 출발 지연 시간 이상치 제거 (1100분 이상)
df = df[df['Departure Delay in Minutes'] < 1100]

# 도착 지연 시간 결측치 평균값 대체
imputer = SimpleImputer(strategy='mean')
df['Arrival Delay in Minutes'] = imputer.fit_transform(df[['Arrival Delay in Minutes']])
```

### 2. 인코딩 (Encoding)
대상 변수와 피처 성격에 맞는 다양한 인코딩 방식을 적용합니다.

```python
from sklearn.preprocessing import LabelEncoder

# Target(satisfaction) 라벨 인코딩
le = LabelEncoder()
df['satisfaction'] = le.fit_transform(df['satisfaction'])

# Class 컬럼 오디널(Ordinal) 인코딩
class_map = {'Eco': 0, 'Eco Plus': 1, 'Business': 2}
df['Class'] = df['Class'].map(class_map)

# 나머지 범주형 원-핫 인코딩
df = pd.get_dummies(df, drop_first=True)
```

---

## 🤖 [Part 2] 머신러닝 성능 비교

### 3. 멀티 모델 평가
다양한 분류 알고리즘의 성능을 동시에 비교합니다.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 데이터 분할
X = df.drop('satisfaction', axis=1)
y = df['satisfaction']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# 모델링 및 평가
models = [
    ('LR', LogisticRegression()),
    ('RF', RandomForestClassifier())
]

for name, model in models:
    model.fit(X_train, y_train)
    acc = accuracy_score(y_test, model.predict(X_test))
    print(f"{name} Accuracy: {acc:.4f}")
```

---

## 🧠 [Part 3] 심층 신경망(DNN) 최적화

### 4. 고급 딥러닝 모델 구축
Dropout과 EarlyStopping을 활용하여 과적합을 방지합니다.

```python
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping

# 데이터 스케일링 (MinMax)
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

# 신경망 설계
model = Sequential([
    Dense(64, activation='relu', kernel_initializer='glorot_uniform', input_shape=(X_train.shape[1],)),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dropout(0.2),
    Dense(1, activation='sigmoid') # 이진 분류
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 조기 종료 설정
es = EarlyStopping(monitor='val_loss', patience=10)

# 학습
model.fit(X_train_s, y_train, validation_data=(X_test_s, y_test), epochs=100, callbacks=[es])
```
