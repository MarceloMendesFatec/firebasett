import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

export default function App() {
  const firebaseConfig = {
    // Sua configuração do Firebase
    apiKey: "AIzaSyCNN3LM5h9SXZVfAFSj8K-44n4MXxbjNx0",
    authDomain: "firabaseteste-464c9.firebaseapp.com",
    databaseURL: "https://firabaseteste-464c9-default-rtdb.firebaseio.com",
    projectId: "firabaseteste-464c9",
    storageBucket: "firabaseteste-464c9.appspot.com",
    messagingSenderId: "333840509964",
    appId: "1:333840509964:web:194bf37b93afe1cff31229",
    measurementId: "G-JT8706Q4HE",
    databaseURL: "https://firabaseteste-464c9-default-rtdb.firebaseio.com/",
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    const usuariosRef = ref(database, "usuarios");
    onValue(usuariosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Se houver dados
        setNome(data.nome);
        setIdade(data.idade);
        setSexo(data.sexo);
      } else {
        // Se não houver dados ou dados inválidos
        setNome("Dados não encontrados");
        setIdade("");
        setSexo("");
      }
    });

    // Limpa o event listener quando o componente é desmontado
    return () => {
      onValue(usuariosRef, null); // Limpa o event listener
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome: {nome}</Text>
      <Text style={styles.text}>Idade: {idade}</Text>
      <Text style={styles.text}>Sexo: {sexo}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#0ff00f",
    fontSize: 28,
  },
});
