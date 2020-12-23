#include <iostream>
#include <string>
#include <fstream>

using namespace std;
string s;
int id = 1;
void sample1(ostream &fout)
{
    fout << "{";
    fout << "\"id\":" << id++ << ",";
    fout << "\"title\":\"Hello, World!\",";
    fout << "\"content\":\"Hello Pukuba This Hawawa!\"";
    fout << "},";
    return;
}

void sample2(ostream &fout)
{
    fout << "{";
    fout << "\"id\":" << id++ << ",";
    fout << "\"title\":\"Second Post!\",";
    fout << "\"content\":\"Pukuba's Second Post...! >.<! \"";
    fout << "},";
}
char addedChar()
{
    int randomNumber = rand() % 61;
    if (randomNumber < 10)
        return randomNumber + '0';
    else if (randomNumber < 36)
    {
        randomNumber -= 10;
        return randomNumber + 'A';
    }
    randomNumber -= 35;
    return randomNumber + 'a';
}
void writePost(ostream &fout)
{
    int titleLength = 10 + (rand() % 20);
    int contentLength = 30 + (rand() % 100);
    string title = "";
    string content = "";
    for (int i = 1; i <= titleLength; i++)
    {
        title += addedChar();
    }
    for (int i = 1; i <= contentLength; i++)
    {
        content += addedChar();
    }
    fout << "{";
    fout << "\"id\":" << id++ << ",";
    fout << "\"title\":\"" << title << "\",";
    fout << "\"content\":\"" << content << "\"";
    fout << "}";
}
int main()
{
    ofstream fout;
    fout.open("post.db.json");
    fout << "[";

    sample1(fout);
    sample2(fout);

    for (int i = 1; i <= 99997; i++)
    {
        writePost(fout);
        fout << ",";
    }
    writePost(fout);

    fout << "]";
    return 0;
}
